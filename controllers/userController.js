// dependencies
import bcrypt from "bcrypt";
import asynHandler from "express-async-handler";
import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

/**
 * @description GET ALL USER DATA
 * @method GET
 * @route /api/v1/user/
 * @access public
 */
export const getAllUser = asynHandler(async (req, res) => {
  // get all user data
  const data = await User.find();

  // validation
  if (data.length === 0) {
    res.status(404).send({ message: "Data not found!" });
  }

  // send response
  res.status(200).send({ count: data.length, users: data });
});

/**
 * @description CREATE NEW USER
 * @method POST
 * @route /api/v1/user/
 * @access public
 */
export const createUser = asynHandler(async (req, res) => {
  // form data
  const { name, email, phone, password } = req.body;

  // validation
  if (!name || !email || !phone || !password) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  // duplicating email check
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return res.status(400).send({ message: "Email already exist!" });
  }

  // duplicating phone check
  const checkPhone = await User.findOne({ phone });
  if (checkPhone) {
    return res.status(400).send({ message: "Phone already exist!" });
  }

  // password hashing
  const hashPassword = await bcrypt.hash(password, 10);

  // file upload to cloudinary
  const fileURL = await uploadToCloudinary(req.file.path);

  // create user
  const createUser = await User.create({
    name,
    email,
    phone,
    password: hashPassword,
    photo: fileURL.secure_url,
  });

  // send response
  res
    .status(201)
    .send({ message: "User created successfully!", user: createUser });
});

/**
 * @description GET SINGLE USER
 * @method GET
 * @route /api/v1/user/:id
 * @access public
 */
export const getSingleUser = asynHandler(async (req, res) => {
  // get user id from params
  const { id } = req.params;

  // get user by id
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    // handle error if the provided ID is invalid
    if (error.name === "CastError") {
      return res.status(400).send({ message: "Invalid user ID format!" });
    }
    // handle other errors
    return res.status(500).send({ message: "Server Error" });
  }

  // send response
  res.status(200).send(user);
});

/**
 * @description UPDATE SINGLE USER
 * @method PUT/PATCH
 * @route /api/v1/user/:id
 * @access public
 */
export const updateSingleUser = asynHandler(async (req, res) => {});

/**
 * @description DELETE SINGLE USER
 * @method DELETE
 * @route /api/v1/user/:id
 * @access public
 */
export const deleteSingleUser = asynHandler(async (req, res) => {});
