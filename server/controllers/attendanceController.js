const Attendance = require("../models/Attendance");

// 📅 Get attendance by student & month
exports.getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { month, year } = req.query;

    let filter = { studentId };

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      filter.date = { $gte: startDate, $lte: endDate };
    }

    const attendance = await Attendance.find(filter);

    // 📊 Attendance %
    const totalDays = attendance.filter(a => a.status !== "HOLIDAY").length;
    const presentDays = attendance.filter(a => a.status === "PRESENT").length;

    const attendancePercentage =
      totalDays === 0 ? 0 : Math.round((presentDays / totalDays) * 100);

    res.json({
      attendance,
      attendancePercentage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
