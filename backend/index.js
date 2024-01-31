import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from './Config/db.js'

// Routes import 
import authRoute from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import doctorRoutes from "./Routes/doctorRoutes.js";
import reviewRoutes from "./Routes/reviewRoutes.js";

dotenv.config();

//database connection
connectDb();


const app = express();
const port = process.env.PORT || 8000;

const corsOptions = { 
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working");
});




// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRoute);  //domain/api/v1/auth/register  //domain/api/v1/auth/login
app.use('/api/v1/user',userRoutes) 
app.use('/api/v1/doctor',doctorRoutes);
app.use('/api/v1/reviews',reviewRoutes);

app.listen(port, () => {
  console.log(`Port is ${port}`);
});
