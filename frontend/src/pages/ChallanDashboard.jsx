import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../../../Admin-dashboard/frontend/src/components/SideBar";

export default function ChallanDashboard() {
  const [challans, setChallans] = useState([]);
  const [loading, setLoading] = useState(false);
  const[month,setMonth]=useState('');
  const[generating,setGenerating]=useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedChallan, setSelectedChallan] = useState(null);

  useEffect(() => {
    fetchChallans();
  }, []);

  const fetchChallans = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://core-dashboard.onrender.com/api/challans");

      setChallans(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch challans error", err);
      setChallans([]);
    } finally {
      setLoading(false);
    }
  };

  const generateChallans = async () => {
  if (!month) {
    alert("Select month");
    return;
  }

  try {
    setGenerating(true);

    await axios.post(
      "https://core-dashboard.onrender.com/api/challans/generate",
      { month }
    );

    alert("Challans generated");
    fetchChallans(); // refresh table
  } catch (err) {
    console.error(err);
    alert("Generation failed");
  } finally {
    setGenerating(false);
  }
};





  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <SideBar />

      <main className="flex-1 p-8 ml-64">
        <div>
          <h1 className="text-2xl font-bold">Monthly Challans</h1>
          <p className="text-slate-500 text-sm">
            Tuition & transport fee records
          </p>
        </div>

<div className="mt-4 flex items-center gap-3">
  <input
    type="month"
    value={month}
    onChange={(e) => setMonth(e.target.value)}
    className="border rounded-lg px-3 py-2 text-sm"
  />

  <button
    onClick={generateChallans}
    disabled={generating}
    className="bg-black text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
  >
    {generating ? "Generating..." : "Generate Monthly Challans"}
  </button>
</div>

        

        <div className="mt-6 bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 text-left text-sm text-slate-500">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Month</th>
                <th className="p-4">Total</th>
                <th className="p-4">Paid</th>
                <th className="p-4">Due</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : challans.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center">
                    No challans found
                  </td>
                </tr>
              ) : (
                challans.map((c) => (
                  <tr key={c._id} className="border-t text-sm">
                    <td className="p-4 font-medium">
                      {c.student ? c.student.fullName : "Student Deleted"}
                    </td>
                    <td className="p-4">{c.month}</td>
                    <td className="p-4">₹{c.totalAmount}</td>
                    <td className="p-4">₹{c.paidAmount}</td>
                    <td className="p-4 font-semibold text-red-600">
                      ₹{c.dueAmount}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="p-4">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                          setSelectedChallan(c);
                          setShowModal(true);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && selectedChallan && (
        <ViewChallanModal
          challan={selectedChallan}
          onClose={() => {
            setShowModal(false);
            setSelectedChallan(null);
            fetchChallans(); // ✅ REFRESH DATA PROPERLY
          }}
        />
      )}
    </div>
  );
}

/* ================= MODAL ================= */

function ViewChallanModal({ challan, onClose }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

 
  const total = Number(challan.totalAmount || 0);
  const paid = Number(challan.paidAmount || 0);
  const due = total - paid;

  const collectPayment = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    if (Number(amount) > due) {
      alert("Amount cannot exceed due amount");
      return;
    }

    try {
      setLoading(true);

      await axios.post("https://core-dashboard.onrender.com/api/payments", {
        challanId: challan._id,
        amount: Number(amount),
        mode: "CASH",
      });

      alert("Payment collected successfully");
      onClose();
      window.location.reload();
    } catch (err) {
  console.error("AXIOS ERROR 👉", err);
  console.error("RESPONSE 👉", err.response?.data);
  alert(err.response?.data?.message || "Payment failed");
}
 finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
  window.open(
    `https://core-dashboard.onrender.com/api/challans/${challan._id}/pdf`,
    "_blank"
  );
};


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-2">Challan Details</h2>
        <p className="text-sm text-slate-500 mb-4">{challan.month}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <p><b>Student:</b> {challan.student?.fullName || "Deleted"}</p>
          <p><b>Class:</b> {challan.student?.classSection || "-"}</p>
          <p><b>Tuition Fee:</b> ₹{challan.tuitionFee}</p>
          <p><b>Transport Fee:</b> ₹{challan.transportFee}</p>
          <p><b>Total:</b> ₹{total}</p>
          <p><b>Paid:</b> ₹{paid}</p>
          <p className="text-red-600 font-semibold">
            <b>Due:</b> ₹{due}
          </p>
        </div>

        {/* ✅ PAYMENT SECTION FIXED */}
        {due > 0 ? (
          <div className="mt-6 space-y-3">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <button
  onClick={downloadPDF}
  className="w-full border mt-3 py-2 rounded-lg text-sm"
>
  Download Challan PDF
</button>


            <button
              onClick={collectPayment}
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Collecting..." : "Collect Payment"}
            </button>
          </div>
        ) : (
          <p className="mt-6 text-green-600 font-semibold text-center">
            Fully Paid ✅
          </p>
        )}
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function StatusBadge({ status }) {
  const colors = {
    PAID: "bg-green-100 text-green-700",
    PARTIAL: "bg-yellow-100 text-yellow-700",
    DUE: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
