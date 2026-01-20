import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function FeeDashboard() {
  const navigate = useNavigate();

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // 🔹 Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/fees");

      if (Array.isArray(res.data)) {
        setFees(res.data);
      } else if (Array.isArray(res.data.fees)) {
        setFees(res.data.fees);
      } else {
        setFees([]);
      }
    } catch (err) {
      console.error("Fetch fees error", err);
      setFees([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredFees = fees.filter((f) =>
    `${f.refId || ""} ${f.student?.fullName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900">
      {/* SIDEBAR */}
      <SideBar />

      {/* MAIN */}
      <main style={{ flex: 1, padding: 32, marginLeft: 256 }}>
        {/* HEADER */}
        <div style={titleRow}>
          <div>
            <h1 style={{ fontSize: 28, margin: 0 }}>Fee Management</h1>
            <p style={{ color: "#64748b", marginTop: 4 }}>
              Collection, receipts, and financial records
            </p>
          </div>

          <button
            style={btnBlack}
            onClick={() => navigate("/fees/collect")}
          >
            + Collect Fee
          </button>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search by Ref ID or Student Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginTop: 20,
            padding: 10,
            width: 320,
            borderRadius: 8,
            border: "1px solid #e5e7eb",
          }}
        />

        {/* TABS */}
        <div style={tabs}>
          <Tab label="All Transactions" active />
          {/* <Tab label="Payment History" />
          <Tab label="Due History" />
          <Tab label="Fee Slip" /> */}
        </div>

        {/* TABLE */}
        <div style={tableWrap}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f8fafc" }}>
              <tr>
                {[
                  "Ref ID",
                  "Student",
                  "Fee Type",
                  "Date",
                  "Mode",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th key={h} style={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={tdCenter}>
                    Loading...
                  </td>
                </tr>
              ) : filteredFees.length === 0 ? (
                <tr>
                  <td colSpan="8" style={tdCenter}>
                    No records found
                  </td>
                </tr>
              ) : (
                filteredFees.map((fee) => (
                  <Row
                    key={fee._id}
                    fee={fee}
                    onView={(f) => {
                      setSelectedFee(f);
                      setShowModal(true);
                    }}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* ================= VIEW MODAL ================= */}
      {showModal && selectedFee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[600px] p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-1">
              Fee Details
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Ref ID: {selectedFee.refId}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Student:</strong>{" "}
                {selectedFee.student?.fullName}
              </p>
              <p>
                <strong>Class:</strong>{" "}
                {selectedFee.student?.classSection}
              </p>
              <p>
                <strong>Fee Type:</strong>{" "}
                {selectedFee.feeType}
              </p>
              <p>
                <strong>Amount:</strong> ₹{selectedFee.amount}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedFee.status}
              </p>
              <p>
                <strong>Payment Mode:</strong>{" "}
                {selectedFee.paymentMode || "-"}
              </p>
            </div>

            {/* PAID */}
            {selectedFee.status === "PAID" && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 font-semibold">
                  Payment Successful
                </p>
                <p>
                  Date:{" "}
                  {new Date(
                    selectedFee.createdAt
                  ).toLocaleDateString()}
                </p>
                {/* <button className="mt-3 border px-4 py-2 rounded">
                  Print Receipt
                </button> */}
              </div>
            )}

            {/* PENDING */}
            {selectedFee.status === "PENDING" && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-yellow-700 font-semibold">
                  Payment Pending
                </p>
                <button
                  className="mt-3 bg-black text-white px-4 py-2 rounded"
                  onClick={() =>
                    navigate(`/fees/collect?ref=${selectedFee.refId}`)
                  }
                >
                  Collect Fee
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Tab({ label, active }) {
  return (
    <div
      style={{
        paddingBottom: 12,
        fontWeight: active ? 700 : 500,
        borderBottom: active ? "2px solid #000" : "none",
        color: active ? "#000" : "#64748b",
      }}
    >
      {label}
    </div>
  );
}

function Row({ fee, onView }) {
  const paid = fee.status === "PAID";

  return (
    <tr style={{ borderTop: "1px solid #e5e7eb" }}>
      <td style={tdMuted}>{fee.refId}</td>
      <td style={tdBold}>{fee.student?.fullName}</td>
      <td style={td}>{fee.feeType}</td>
      <td style={td}>
        {new Date(fee.createdAt).toLocaleDateString()}
      </td>
      <td style={td}>{fee.paymentMode || "-"}</td>
      <td style={{ ...td, fontWeight: 700 }}>
        ₹{fee.amount}
      </td>
      <td style={td}>
        <span
          style={{
            padding: "4px 12px",
            borderRadius: 999,
            fontSize: 12,
            background: paid ? "#dcfce7" : "#fff7ed",
            color: paid ? "#15803d" : "#c2410c",
          }}
        >
          {paid ? "Paid" : "Pending"}
        </span>
      </td>
      <td style={td}>
        <button
          onClick={() => onView(fee)}
          className="text-blue-600 hover:underline"
        >
          View
        </button>
      </td>
    </tr>
  );
}

/* ================= STYLES ================= */

const titleRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const tabs = {
  display: "flex",
  gap: 24,
  marginTop: 32,
  borderBottom: "1px solid #e5e7eb",
};

const tableWrap = {
  background: "#fff",
  borderRadius: 16,
  border: "1px solid #e5e7eb",
  marginTop: 24,
  overflow: "hidden",
};

const th = { padding: 16, fontSize: 12, color: "#64748b" };
const td = { padding: 16 };
const tdBold = { padding: 16, fontWeight: 600 };
const tdMuted = { padding: 16, color: "#94a3b8" };
const tdCenter = { padding: 20, textAlign: "center" };

const btnBlack = {
  padding: "10px 16px",
  borderRadius: 10,
  background: "#000",
  color: "#fff",
  border: "none",
};
