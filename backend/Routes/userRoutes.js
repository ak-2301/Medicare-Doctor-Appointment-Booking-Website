import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

//getall users
router.get("/", authenticate, restrict(["admin"]), getAllUser);

//get single user
router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);

//update user
router.put("/:id", authenticate, restrict(["patient"]), updateUser);

//delete user
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);

export default router;
