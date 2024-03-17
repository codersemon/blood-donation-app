// dependencies
import express from "express";
import {
  createUser,
  deleteSingleUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
} from "../controllers/userController.js";
import { userPhotoMiddleWare } from "../utils/multer.js";

// initialize the Router
const router = express.Router();

// creating routes
router.route("/").get(getAllUser).post(userPhotoMiddleWare, createUser);
router
  .route("/:id")
  .get(getSingleUser)
  .patch(updateSingleUser)
  .put(updateSingleUser)
  .delete(deleteSingleUser);

// export router
export default router;
