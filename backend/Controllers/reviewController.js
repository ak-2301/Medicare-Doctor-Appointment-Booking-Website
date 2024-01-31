import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

// get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).select("-password");

    res.status(200).json({
      message: "Reviews Found Successfully",
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(404).json({
      message: "No reviews found",
      success: false,
    });
  }
};

//create review
export const createReview = async (req, res) => {
  if (!req.body.doctor) {
    req.body.doctor = req.params.doctorId;
  }
  if (!req.body.user) {
    req.body.user = req.userId;
  }

  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();

    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });


    res.status(200).json({
      message: "Review Submitted Successfully",
      success: true,
      data: savedReview,
    });
  } catch (error) {

    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
