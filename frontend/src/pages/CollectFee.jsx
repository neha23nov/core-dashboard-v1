import React, { useState } from "react";
import axios from "axios";

export default function CollectFee() {
  const [dark, setDark] = useState(false);
  const [form, setForm] = useState({
    studentId: "",
    feeType: "",
    date: "",
    amount: "",
    concession: "",
    remarks: "",
  });

  const netPayable =
    Number(form.amount || 0) - Number(form.concession || 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const bg = dark ? "#0f172a" : "#f8fafc";
  const panel = dark ? "#020617" : "#ffffff";
  const border = dark ? "#1e293b" : "#e2e8f0";
  const text = dark ? "#e5e7eb" : "#0f172a";
  const muted = dark ? "#94a3b8" : "#64748b";

  const submitFee = async () => {
    try {
      await axios.post("https://core-dashboard.onrender.com/api/fees/collect", {
        studentId: form.studentId,
        feeType: form.feeType,
        amount: Number(form.amount),
        concession: Number(form.concession || 0),
        remarks: form.remarks,
        paymentMode: "Cash",
        date: form.date,
      });

      alert("Fee collected successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Fee collection failed ❌");
    }
  };

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Collect Fee - School Management System</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>

      <div
        style={{
          fontFamily: "Inter, sans-serif",
          backgroundColor: bg,
          color: text,
          minHeight: "100vh",
          display: "flex",
          fontSize: 16,
        }}
      >
        {/* SIDEBAR */}
        {/* <aside
          style={{
            width: 260,
            backgroundColor: panel,
            borderRight: `1px solid ${border}`,
          }}
        >
          <div style={{ padding: 24, display: "flex", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                backgroundColor: "#000",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="material-icons-outlined" style={{ color: "#fff" }}>
                school
              </span>
            </div>
            <strong>EduManage</strong>
          </div>
        </aside> */}

        {/* MAIN */}
        <main style={{ flex: 1 }}>
          {/* HEADER */}
          <header
            style={{
              height: 64,
              backgroundColor: panel,
              borderBottom: `1px solid ${border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 32px",
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            <strong>Collect Fee</strong>

            {/* <button
              onClick={() => setDark(!dark)}
              style={{
                padding: 10,
                borderRadius: 10,
                border: "none",
                backgroundColor: "#000",
                color: "#fff",
              }}
            >
              <span className="material-icons-outlined">dark_mode</span>
            </button> */}
          </header>

          {/* CONTENT */}
          <div style={{ display: "flex", height: "calc(100vh - 64px)" }}>
            {/* FORM */}
          <section
  style={{
    width: 480,
    maxWidth: "100%",
    backgroundColor: panel,
    borderRight: `1px solid ${border}`,
    borderRadius: 12,
    margin: "32px auto",
    boxShadow: dark
      ? "0 4px 20px rgba(0,0,0,0.6)"
      : "0 4px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}
>

              <div style={{ padding: 32 }}>
                {/* STUDENT */}
                <input
                  name="studentId"
                  value={form.studentId}
                  onChange={handleChange}
                  placeholder="Student ID"
                  style={inputStyle(dark)}
                />

                {/* FEE TYPE */}
                <input
                  name="feeType"
                  value={form.feeType}
                  onChange={handleChange}
                  placeholder="Fee Type"
                  style={inputStyle(dark)}
                />

                {/* DATE */}
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  style={inputStyle(dark)}
                />

                {/* AMOUNT */}
                <input
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Total Amount"
                  style={inputStyle(dark)}
                />

                {/* CONCESSION */}
                <input
                  name="concession"
                  value={form.concession}
                  onChange={handleChange}
                  placeholder="Concession"
                  style={inputStyle(dark)}
                />

                {/* REMARKS */}
                <input
                  name="remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  placeholder="Remarks"
                  style={inputStyle(dark)}
                />

               <div style={{
    marginTop: 20,
    fontWeight: 700,
    fontSize: 18,
    color: dark ? "#e2e8f0" : "#111827"
}}>
    Net Payable: ₹{netPayable.toFixed(2)}
</div>

              </div>

              <div style={{ padding: 32 }}>
                <button
                  onClick={submitFee}
                  style={{
                    width: "100%",
                    padding: 16,
                    borderRadius: 14,
                    border: "none",
                    backgroundColor: "#000",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  Confirm Payment
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

function inputStyle(dark) {
  return {
    width: "100%",
    padding: "14px 16px",
    marginBottom: 16,
    borderRadius: 12,
    border: `1px solid ${dark ? "#334155" : "#cbd5e1"}`,
    backgroundColor: dark ? "#1e293b" : "#f8fafc",
    color: dark ? "#f1f5f9" : "#0f172a",
    fontSize: 16,
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };
}
