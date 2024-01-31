import express from "express";

import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  getAllReviews,
  createReview,
} from "../Controllers/reviewController.js"; 

const router = express.Router({ mergeParams: true });

//getall reviews
router
  .route("/")
  .get(getAllReviews)
  .post(authenticate, restrict(["patient"]), createReview);

export default router;
