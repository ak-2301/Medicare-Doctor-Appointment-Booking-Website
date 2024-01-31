// for mongoose database connection

import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDb Database Connected");
  } catch (error) {
    console.log("MongoDb Database not Connected ");
  }
};

export default connectDb;
