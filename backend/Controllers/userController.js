import User from "../models/UserSchema.js";

//Update existing user
export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      message: "User Updated Successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update",
      success: false,
    });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User Deleted Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete",
      success: false,
    });
  }
};

//Get Single User
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select('-password');

    res.status(200).json({
      message: "User Found Successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "No user found",
      success: false,
    });
  }
};

//get all user
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');

    res.status(200).json({
      message: "Users Found Successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      message: "No users found",
      success: false,
    });
  }
};
