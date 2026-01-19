const Student = require("../models/Student");

exports.addStudent = async (req, res) => {
  try {
    console.log("Incoming body:", req.body); // 🔍 DEBUG

    const { fullName, studentId, classSection } = req.body;

    if (!fullName || !studentId || !classSection) {
      return res.status(400).json({
        message: "fullName, studentId and classSection are required",
      });
    }

    const existing = await Student.findOne({ studentId });
    if (existing) {
      return res.status(400).json({
        message: "Student with this ID already exists",
      });
    }

    const student = await Student.create(req.body);

    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// ✅ GET STUDENTS WITH SEARCH
exports.getStudents = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const query = {
      $or: [
        { fullName: { $regex: search, $options: "i" } },
        { studentId: { $regex: search, $options: "i" } },
      ],
    };

    const students = await Student.find(query).sort({ createdAt: -1 });

    res.json({
      students, // 👈 IMPORTANT (your frontend expects this)
      total: students.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
