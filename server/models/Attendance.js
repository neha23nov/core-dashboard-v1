const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },

  date: Date,

  status: {
    type: String,
    enum: ["PRESENT", "ABSENT", "HOLIDAY"],
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
