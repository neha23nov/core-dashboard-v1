// models/Challan.js
const mongoose = require("mongoose");

const challanSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    month: {
      type: String, // "2026-07"
      required: true,
    },

    tuitionFee: {
      type: Number,
      default: 0,
    },

    transportFee: {
      type: Number,
      default: 0,
    },

    previousDue: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    dueAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["DUE", "PARTIAL", "PAID"],
      default: "DUE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challan", challanSchema);
