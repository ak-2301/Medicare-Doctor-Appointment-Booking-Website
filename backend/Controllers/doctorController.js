import Doctor from "../models/DoctorSchema.js";

//Update existing user
export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      message: "Doctor Updated Successfully",
      success: true,
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update",
      success: false,
    });
  }
};

//delete user
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      message: "Doctor Deleted Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete",
      success: false,
    });
  }
};

//Get Single Doctor details
export const getSingleDoctorDetail = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");

    res.status(200).json({
      message: "Doctor Found Successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(404).json({
      message: "No doctor found",
      success: false,
    });
  }
};

//get all user
export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res.status(200).json({
      message: "Doctors Found Successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    res.status(404).json({
      message: "No doctors found",
      success: false,
    });
  }
};
