import React, { useState } from "react";
import api from "../api/axios";

export default function EditFeeModal({ fee, onClose, onUpdated }) {
  const [form, setForm] = useState({
    totalAmount: fee.totalAmount,
    concession: fee.concession,
    paymentMethod: fee.paymentMethod,
    remarks: fee.remarks || "",
  });

  const netPayable =
    Number(form.totalAmount) - Number(form.concession);

  const updateFee = async () => {
    await api.put(`/fees/${fee._id}`, {
      ...form,
      netPayable,
    });
    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Edit Transaction</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-3">
            <input
              className="w-full border p-3 rounded"
              value={form.totalAmount}
              onChange={(e) =>
                setForm({ ...form, totalAmount: e.target.value })
              }
            />

            <input
              className="w-full border p-3 rounded"
              value={form.concession}
              onChange={(e) =>
                setForm({ ...form, concession: e.target.value })
              }
            />

            <div className="font-bold">
              Net Payable: ${netPayable}
            </div>

            <div className="flex gap-2">
              {["Cash", "Card", "Online"].map((m) => (
                <button
                  key={m}
                  className={`flex-1 py-2 rounded border ${
                    form.paymentMethod === m
                      ? "bg-black text-white"
                      : ""
                  }`}
                  onClick={() =>
                    setForm({ ...form, paymentMethod: m })
                  }
                >
                  {m}
                </button>
              ))}
            </div>

            <textarea
              className="w-full border p-3 rounded"
              placeholder="Remarks"
              value={form.remarks}
              onChange={(e) =>
                setForm({ ...form, remarks: e.target.value })
              }
            />
          </div>

          {/* RIGHT */}
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold mb-2">
              {fee.student.fullName}
            </h3>
            <p className="text-sm text-slate-500">
              ID: {fee.student.studentId}
            </p>
            <p className="mt-4 text-sm">
              Fee History (static for now)
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button className="border px-4 py-2" onClick={onClose}>
            Cancel
          </button>
          <button
            onClick={updateFee}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
