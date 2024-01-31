// here registration and login logic
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//generate token using jwt
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "2d",
    }
  );
};

//register User
export const registerUser = async (req, res) => {
  const { name, email, password, role, gender, photo } = req.body;
  try {
    let user = null;
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    //check if user is exist
    if (user) {
      res.status(400).json({
        message: "User Already exist",
      });
    }

    //hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // if role is patient
    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    // if role is doctor
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();

    res.status(200).json({
      message: "Register Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

//Login User
export const loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }

    //check if user exist or not
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not exist , Kindly register first" });
    }

    // if found check password with hashPassword
    const isPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Password is Incorrect" });
    }

    //get token
    const token = generateToken(user);

    const { password, role, appointments, ...rest } = user._doc;

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error failed to login" });
  }
};
