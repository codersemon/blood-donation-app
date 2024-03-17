// dependencies
import bcrypt from "bcrypt";
import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { createOTP, isEmail, isPhone, tokenDecode } from "../helpers/helper.js";
import { AccountActivationEmail } from "../mails/AccountActivationEmail.js";
import UserModel from "../models/User.js";
import { sendSMS } from "../utils/sendSMS.js";

/**
 * @description REGISTER USER BY NAME, EMAIL/PHONE & PASSWORD
 * @mthod POST
 * @route /api/v1/auth/register
 * @access public
 */
export const registerAuthController = AsyncHandler(async (req, res) => {
  // getting form data
  const { name, auth, password, role } = req.body;

  // validating form field
  if (!name || !auth || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // checking email or phone
  let authEmail = null;
  let authPhone = null;

  if (isPhone(auth)) {
    // asign auth to authPhone
    authPhone = auth;

    // checking phone number existence in database
    const checkPhone = await UserModel.findOne({ phone: auth });
    if (checkPhone) {
      return res.status(400).json({ message: "Phone already registered!" });
    }
  } else if (isEmail(auth)) {
    // asign auth to authEmail
    authEmail = auth;

    // checking email existence in database
    const checkEmail = await UserModel.findOne({ email: auth });
    if (checkEmail) {
      return res.status(400).json({ message: "Email already registered!" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Please provide valid phone or email address" });
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate OTP for account activation
  const OTP = createOTP();

  // creating user
  const user = await UserModel.create({
    name,
    email: authEmail,
    phone: authPhone,
    password: hashedPassword,
    role,
    accessToken: OTP,
  });

  // actions after registration success
  if (user) {
    // sending OTP for account activation
    isPhone(auth)
      ? sendSMS(auth, `Hi ${name}, you account activating OTP is ${OTP}`)
      : AccountActivationEmail(auth, { code: OTP, link: "#" });

    // generating activationToken by jsonwebtoken package
    const activationToken = jwt.sign({ auth }, process.env.JWT_ACCOUNT_ACTIVATION_STRING, {
      expiresIn: "15min",
    });
    // send activationToken to cookie
    res.cookie("activationToken", activationToken);
  }

  // send response
  return res.status(201).json({ message: "Registration successful!", user });
});

/**
 * @description ACTIVATE USER ACCOUNT BY OTP & ACCESSTOKEN
 * @mthod POST
 * @route /api/v1/auth/activate-account-by-otp/:token
 * @access public
 */
export const activateAccountByOTPController = AsyncHandler(async (req, res) => {
  // getting otp from the submission
  const { otp } = req.body;
  // getting token from params
  const { token } = req.params;
  const decodedToken = tokenDecode(token);

  // verify token
  const verifiedToken = jwt.verify(decodedToken, process.env.JWT_ACCOUNT_ACTIVATION_STRING);
  if (!verifiedToken) {
    return res.status(400).json({ message: "Invalid token!" });
  }

  // activate user account
  let activateUser = null;

  if (isPhone(verifiedToken.auth)) {
    // checking account with phone in database
    activateUser = await UserModel.findOne({ phone: verifiedToken.auth });

    // return if account not found
    if (!activateUser) {
      return res
        .status(404)
        .json({ message: "No account found with your phone number!" });
    }
  } else if (isEmail(verifiedToken.auth)) {
    // checking account with email in database
    activateUser = await UserModel.findOne({ email: verifiedToken.auth });

    // return if account not found
    if (!activateUser) {
      return res
        .status(404)
        .json({ message: "No account found with your email address!" });
    }
  } else {
    // return if no account found with access token
    return res
      .status(400)
      .json({ message: `No account found with your ${verifiedToken.auth}` });
  }

  // check OTP
  if (otp !== activateUser.accessToken) {
    return res.status(400).json({ message: "Wrong OTP" });
  }

  // update activate user data
  activateUser.isActivate = true;
  activateUser.accessToken = null;
  activateUser.save();

  // clear cookie
  res.clearCookie("activationToken");

  // send response
  res
    .status(200)
    .json({ message: "User activation successful", user: activateUser });
});

/**
 * @description LOGIN USER BY EMAIL/PHONE & PASSWORD
 * @mthod POST
 * @route /api/v1/auth/login
 * @access public
 */
export const loginAuthController = AsyncHandler(async (req, res) => {
  // get submission
  const { auth, password } = req.body;

  // check user by auth
  let user = null;
  if (isPhone(auth)) {
    user = await UserModel.findOne({ phone: auth }).select();

    // if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
  } else if (isEmail(auth)) {
    user = await UserModel.findOne({ email: auth });

    // if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
  } else {
    return res.status(400).json({ message: "Invalid phone or email address!" });
  }

  // checking password
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(400).json({ message: "Password is wrong!" });
  }

  // generate token
  const accessToken = jwt.sign({ auth }, process.env.JWT_LOGIN_STRING, {
    expiresIn: "365d",
  });

  // set login cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  // send response
  res.status(200).json({ user, message: "Login successful!" });
});

/**
 * @description LOGOUT USER
 * @mthod POST
 * @route /api/v1/auth/logout
 * @access private
 */
export const logoutAuthController = AsyncHandler(async (req, res) => {
  // clear access token upon logout
  res.clearCookie("accessToken");

  // send response
  res.status(200).json({ message: "Logout successful" });
});

/**
 * @description LOGIN USER BY EMAIL/PHONE & PASSWORD
 * @mthod POST
 * @route /api/v1/auth/forgot-password
 * @access public
 */
export const forgotPasswordAuthController = AsyncHandler(
  async (req, res) => {}
);

/**
 * @description TEMPORARY MYACCOUNT
 * @mthod GET
 * @route /api/v1/auth/my-account
 * @access private
 */
export const myAccountController = AsyncHandler(async (req, res) => {
  console.log(req.me);
});
