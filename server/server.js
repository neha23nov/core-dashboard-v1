const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./confiq/db");
const studentRoutes=require("./routes/studentRoutes");

const attendanceRoutes=require("./routes/attendanceRoutes");
const feeRoutes=require("./routes/feeRoutes");
const cors=require("cors");
const mongoose=require("mongoose");





dotenv.config();

connectDB();

const app=express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fees",feeRoutes);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () =>
      console.log("Server running on http://localhost:5000")
    );
  })
  .catch((err) => console.error(err));
