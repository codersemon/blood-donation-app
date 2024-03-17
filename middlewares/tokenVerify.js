// dependencies
import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { isEmail, isPhone } from "../helpers/helper.js";
import UserModel from "../models/User.js";

// create tokenVerify middleware
const tokenVerify = async (req, res, next) => {
  // get accessToken from cookie
  const token = req.cookies.accessToken;

  // check if have no token
  if (!token) {
    return res.status(400).json({ message: "Unathorized" });
  }

  // verify token
  const verifyToken = jwt.verify(
    token,
    process.env.JWT_LOGIN_STRING,
    AsyncHandler(async (error, decode) => {
      // if token is invalid then will return error
      if (error) {
        return res.status(400).json({ message: "Invalid token!" });
      }

      // get logged-in user data
      const auth = decode.auth;
      let me = null;

      if (isPhone(auth)) {
        me = await UserModel.findOne({ phone: auth }).select("-password");
      } else if (isEmail(auth)) {
        me = await UserModel.findOne({ email: auth }).select("-password");
      } else {
        return res.status(400).json({ message: "Invalid auth data!" });
      }

      // send login data to controller
      req.me = me;

      // proceed to controller
      next();
    })
  );
};

// export
export default tokenVerify;
