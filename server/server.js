const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./confiq/db");
const studentRoutes=require("./routes/studentRoutes");
const paymentsRoutes=require("./routes/paymentRoutes");


const attendanceRoutes=require("./routes/attendanceRoutes");
const challanRoutes=require("./routes/challanRoutes");
const feeRoutes=require("./routes/feeRoutes");
const cors=require("cors");
const mongoose=require("mongoose");





dotenv.config();

connectDB();

const app=express();

app.use(express.json());
app.use(
  cors({
    origin: "*", // allow deployed frontend
    credentials: true,
  })
);


app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fees",feeRoutes);
app.use("/api/challans",challanRoutes);
app.use("/api/payments",paymentsRoutes);





const PORT = process.env.PORT || 5000;



app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

