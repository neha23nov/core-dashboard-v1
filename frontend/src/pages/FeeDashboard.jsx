import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


export default function FeeDashboard() {
    const [fees, setFees] = useState([]);

useEffect(() => {
  fetchFees();
}, []);

const fetchFees = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/fees");
    setFees(res.data);
  } catch (err) {
    console.error("Fetch fees error", err);
  }
};

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>

      {/* HEADER */}
      <header
        style={{
          height: 64,
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 24
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "#000",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            M
          </div>
          <strong>DEMO SCHOOL</strong>
        </div>

        <div style={{ flex: 1 }}>
          <input
            placeholder="Search student by name, father name, Adm no"
            style={{
              width: "100%",
              maxWidth: 640,
              padding: "10px 16px",
              borderRadius: 999,
              border: "none",
              background: "#f1f5f9",
              fontSize: 14
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <select style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e5e7eb" }}>
            <option>2025-2026</option>
          </select>
          <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #22c55e" }} />
        </div>
      </header>

      {/* BODY */}
      <div style={{ display: "flex" }}>

        {/* SIDEBAR */}
        <aside
          style={{
            width: 260,
            background: "#ffffff",
            borderRight: "1px solid #e5e7eb",
            minHeight: "calc(100vh - 64px)",
            padding: 16
          }}
        >
          {[
            "Attendance",
            "Examination",
            "Transport",
            "Hostel"
          ].map(item => (
            <div key={item} style={{ padding: "10px 14px", borderRadius: 8, color: "#475569" }}>
              {item}
            </div>
          ))}

          <div
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: "#000",
              color: "#fff",
              fontWeight: 600,
              marginTop: 8
            }}
          >
            Fees
          </div>

          {[
            "Communication",
            "Point of Sale",
            "Payroll"
          ].map(item => (
            <div key={item} style={{ padding: "10px 14px", borderRadius: 8, color: "#475569" }}>
              {item}
            </div>
          ))}

          <div style={{ position: "absolute", bottom: 24 }}>
            <strong>Admin User</strong>
            <div style={{ fontSize: 12, color: "#64748b" }}>Principal</div>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, padding: 32 }}>

          {/* TITLE */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: 28, margin: 0 }}>Fee Management</h1>
              <p style={{ color: "#64748b", marginTop: 4 }}>
                Collection, receipts, and financial records
              </p>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button style={btnWhite}>Fee Slip</button>
              <button style={btnWhite}>Reports</button>
              <button style={btnBlack}>+ Collect Fee</button>
              <button style={btnIcon}>⚙</button>
            </div>
          </div>

          {/* TABS */}
          <div style={{ display: "flex", gap: 24, marginTop: 32, borderBottom: "1px solid #e5e7eb" }}>
            <Tab active label="All Transactions" />
            <Tab label="Payment History" />
            <Tab label="Dues History" />
            <Tab label="Concession Log" />
            <Tab label="Student Ledger" />
          </div>

          {/* SEARCH + FILTER */}
          <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
            <input
              placeholder="Search by student name or transaction ID..."
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: 10,
                background: "#1e293b",
                color: "#fff",
                border: "none"
              }}
            />
            <button style={btnWhite}>Filters</button>
          </div>

          {/* TABLE */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #e5e7eb",
              marginTop: 24,
              overflow: "hidden"
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#f8fafc" }}>
                <tr>
                  {["Ref ID","Student","Fee Type","Date","Mode","Amount","Status","Actions"].map(h => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>

             <tbody>
  {fees.map((f) => (
    <Row
      key={f._id}
      id={f.refId}
      name={f.student?.fullName}
      type={f.feeType}
date={
  f.createdAt
    ? new Date(f.createdAt).toISOString().slice(0, 10)
    : "-"
}

      mode={f.paymentMode}
      amount={`₹${f.amount}`}
      status={f.status === "PAID" ? "Paid" : "Pending"}
    />
  ))}
</tbody>

            </table>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 16,
                color: "#64748b",
                fontSize: 14
              }}
            >
              Showing <strong>1–4</strong> of <strong>1,248</strong> transactions
              <div style={{ display: "flex", gap: 8 }}>
                <button style={btnIcon}>‹</button>
                <button style={btnIcon}>›</button>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* DARK MODE BUTTON */}
      <button
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "#fff",
          border: "1px solid #e5e7eb",
          boxShadow: "0 10px 20px rgba(0,0,0,.1)"
        }}
      >
        🌙
      </button>
    </div>
  );
}

/* ===== HELPERS ===== */

const btnWhite = {
  padding: "10px 16px",
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: "#fff",
  fontWeight: 500
};

const btnBlack = {
  padding: "10px 16px",
  borderRadius: 10,
  background: "#000",
  color: "#fff",
  fontWeight: 600,
  border: "none"
};

const btnIcon = {
  width: 40,
  height: 40,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: "#fff"
};

const th = {
  padding: 16,
  textAlign: "left",
  fontSize: 12,
  color: "#64748b"
};

function Tab({ label, active }) {
  return (
    <div
      style={{
        paddingBottom: 12,
        fontWeight: active ? 700 : 500,
        borderBottom: active ? "2px solid #000" : "none",
        color: active ? "#000" : "#64748b"
      }}
    >
      {label}
    </div>
  );
}

function Row({ id, name, type, date, mode, amount, status }) {
  const paid = status === "Paid";
  return (
    <tr style={{ borderTop: "1px solid #e5e7eb" }}>
      <td style={tdMuted}>{id}</td>
      <td style={tdBold}>{name}</td>
      <td style={td}>{type}</td>
      <td style={td}>{date}</td>
      <td style={td}>{mode}</td>
      <td style={{ ...td, fontWeight: 700 }}>{amount}</td>
      <td style={td}>
        <span
          style={{
            padding: "4px 12px",
            borderRadius: 999,
            fontSize: 12,
            background: paid ? "#dcfce7" : "#fff7ed",
            color: paid ? "#15803d" : "#c2410c",
            border: `1px solid ${paid ? "#bbf7d0" : "#fed7aa"}`
          }}
        >
          {status}
        </span>
      </td>
     <td style={td}>
  <button>View</button>
  <button>Edit</button>
  <button>Print</button>
</td>

    </tr>
  );
}

const td = { padding: 16 };
const tdBold = { padding: 16, fontWeight: 600 };
const tdMuted = { padding: 16, color: "#94a3b8" };
