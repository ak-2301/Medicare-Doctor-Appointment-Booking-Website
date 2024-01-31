import express from "express";
import {
  deleteDoctor,
  getAllDoctor,
  getSingleDoctorDetail,
  updateDoctor,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRoute from "./reviewRoutes.js";
const router = express.Router();


//nested routes 
router.use('/:doctorId/reviews',reviewRoute)

//getall users
router.get("/",  getAllDoctor);

//get single user
router.get("/:id", getSingleDoctorDetail);

//update user
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);

//delete user
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

export default router;
