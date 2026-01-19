import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function PrintFeeSlip() {
  const { id } = useParams();
  const [fee, setFee] = useState(null);

  useEffect(() => {
    api.get(`/fees/${id}`).then((res) => setFee(res.data));
  }, [id]);

  if (!fee) return null;

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Fee Slip</h1>

      <div className="border p-6 rounded">
        <p>Student: {fee.student.fullName}</p>
        <p>Fee Type: {fee.feeType}</p>
        <p>Amount Paid: ${fee.netPayable}</p>
        <p>Date: {new Date(fee.date).toLocaleDateString()}</p>
      </div>

      <button
        onClick={() => window.print()}
        className="mt-6 bg-black text-white px-6 py-2 rounded"
      >
        Print
      </button>
    </div>
  );
}
