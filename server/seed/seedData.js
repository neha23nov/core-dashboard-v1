const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../confiq/db");

const Student = require("../models/Student");
const Fee = require("../models/Fee");
const Attendance = require("../models/Attendance");

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await Student.deleteMany();
    await Fee.deleteMany();
    await Attendance.deleteMany();

    const students = await Student.insertMany([
      {
        studentId: "S001",
        fullName: "Alice Johnson",
        gender: "Female",
        age: 15,
        classSection: "Grade 10-A",
        status: "ACTIVE",
        joiningDate: new Date("2022-06-01"),
        gpa: 3.8,
        rank: { position: 4, total: 42 },
        subjects: { math: "A+", science: "A", english: "B+" },
        targets: {
          targetGpa: 3.8,
          targetAttendance: 95,
          predictionNote:
            "Alice is projected to exceed the target GPA based on past performance.",
        },
        guardian: {
          name: "Robert Johnson",
          phone: "+1 555-123-4567",
        },
        feeStatus: "Cleared",
        bloodGroup: "O Positive",
        address: "123 Education Lane, Learning District, CA",
      },

      {
        studentId: "S002",
        fullName: "Bob Smith",
        gender: "Male",
        age: 16,
        classSection: "Grade 10-B",
        status: "ACTIVE",
        gpa: 3.2,
        guardian: {
          name: "John Smith",
          phone: "+1 555-987-6543",
        },
      },

      {
        studentId: "S003",
        fullName: "Charlie Davis",
        gender: "Male",
        age: 17,
        classSection: "Grade 11-A",
        status: "ACTIVE",
        gpa: 3.5,
        guardian: {
          name: "Emma Davis",
          phone: "+1 555-444-2222",
        },
      },

      {
        studentId: "S004",
        fullName: "David Miller",
        gender: "Male",
        age: 18,
        classSection: "Grade 12-C",
        status: "INACTIVE",
        gpa: 3.9,
        guardian: {
          name: "Laura Miller",
          phone: "+1 555-111-9999",
        },
      },
    ]);

    // 🧾 Fees for Alice
    await Fee.insertMany([
      {
        studentId: students[0]._id,
        title: "Quarter 3 Tuition",
        amount: 1250,
        paidOn: new Date("2024-10-12"),
      },
      {
        studentId: students[0]._id,
        title: "Transport Fee - Oct",
        amount: 150,
        paidOn: new Date("2024-10-05"),
      },
      {
        studentId: students[0]._id,
        title: "Library Fee",
        amount: 45,
        paidOn: new Date("2024-09-15"),
      },
    ]);

    // 📅 Attendance for Alice (October)
    await Attendance.insertMany([
      { studentId: students[0]._id, date: "2025-10-01", status: "PRESENT" },
      { studentId: students[0]._id, date: "2025-10-02", status: "PRESENT" },
      { studentId: students[0]._id, date: "2025-10-08", status: "ABSENT" },
      { studentId: students[0]._id, date: "2025-10-04", status: "HOLIDAY" },
    ]);

    console.log("✅ Sample data seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
