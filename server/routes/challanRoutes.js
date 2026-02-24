const express = require("express");
const Challan = require("../models/Challan");
const Student = require("../models/Student");


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const challans = await Challan.find()
      .populate("student", "fullName classSection")
      .sort({ createdAt: -1 });

    res.json(challans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { student, month, tuitionFee = 0, transportFee = 0, previousDue = 0 } = req.body;

    if (!student || !month) {
      return res.status(400).json({ message: "Student _id and month are required" });
    }

    // ✅ find student by ObjectId
    const studentData = await Student.findById(student);
    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }

    // ✅ prevent duplicate challan for same student and month
    const exists = await Challan.findOne({ student, month });
    if (exists) {
      return res.status(400).json({ message: "Challan already exists for this month" });
    }

    const totalAmount = tuitionFee + transportFee + previousDue;

    const challan = await Challan.create({
      student,       // student _id
      month,
      tuitionFee,
      transportFee,
      previousDue,
      totalAmount,
      paidAmount: 0,
      dueAmount: totalAmount,
      status: totalAmount === 0 ? "PAID" : "DUE",
    });

    res.status(201).json(challan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});



/* =======================
   GENERATE MONTHLY CHALLANS
======================= */
router.post("/generate", async (req, res) => {
  try {
    const { month } = req.body;
    if (!month) {
      return res.status(400).json({ message: "Month required" });
    }

    const fees = await Fee.find().populate("student");
    if (fees.length === 0) {
      return res.status(400).json({ message: "No fee data found" });
    }

    let created = 0;

    for (const fee of fees) {
      const student = fee.student;

      const exists = await Challan.findOne({
        student: student._id,
        month,
      });
      if (exists) continue;

      const lastChallan = await Challan.findOne({
        student: student._id,
      }).sort({ createdAt: -1 });

      const previousDue = lastChallan ? lastChallan.dueAmount : 0;

      const totalAmount = fee.tuitionFee + fee.transportFee + previousDue;

      // 🚫 DO NOT CREATE ZERO CHALLANS
      if (totalAmount <= 0) continue;

      await Challan.create({
        student: student._id,
        month,
        tuitionFee: fee.tuitionFee,
        transportFee: fee.transportFee,
        previousDue,
        totalAmount,
        paidAmount: 0,
        dueAmount: totalAmount,
        status: "DUE",
      });

      created++;
    }

    res.json({
      message: "Monthly challans generated successfully",
      created,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

router.get("/:id/pdf", async (req, res) => {
  try {
    const challan = await Challan.findById(req.params.id).populate(
      "student",
      "fullName classSection",
    );

    if (!challan) {
      return res.status(404).json({ message: "Challan not found" });
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=challan-${challan._id}.pdf`,
    );

    doc.pipe(res);

    // ===== HEADER =====
    doc.fontSize(18).text("SCHOOL FEE CHALLAN", { align: "center" });
    doc.moveDown();

    // ===== STUDENT INFO =====
    doc.fontSize(12);
    doc.text(`Student: ${challan.student?.fullName}`);
    doc.text(`Class: ${challan.student?.classSection}`);
    doc.text(`Month: ${challan.month}`);
    doc.moveDown();

    // ===== FEES =====
    doc.text(`Tuition Fee: ₹${challan.tuitionFee}`);
    doc.text(`Transport Fee: ₹${challan.transportFee}`);
    doc.text(`Previous Due: ₹${challan.previousDue}`);
    doc.moveDown();

    // ===== TOTALS =====
    doc.fontSize(13).text(`Total Amount: ₹${challan.totalAmount}`);
    doc.text(`Paid Amount: ₹${challan.paidAmount}`);
    doc.fillColor("red").text(`Due Amount: ₹${challan.dueAmount}`);
    doc.fillColor("black");
    doc.moveDown();

    doc.text(`Status: ${challan.status}`);
    doc.text(`Generated On: ${new Date().toLocaleDateString()}`);

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "PDF generation failed" });
  }
});

module.exports = router;
