import React, { useState } from "react";

export default function CollectFee() {
  const [dark, setDark] = useState(false);

  const bg = dark ? "#0f172a" : "#f8fafc";
  const panel = dark ? "#020617" : "#ffffff";
  const border = dark ? "#1e293b" : "#e2e8f0";
  const text = dark ? "#e5e7eb" : "#0f172a";
  const muted = dark ? "#94a3b8" : "#64748b";

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
          overflow: "hidden",
        }}
      >
        {/* SIDEBAR */}
        <aside
          style={{
            width: 260,
            backgroundColor: panel,
            borderRight: `1px solid ${border}`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
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
              <span
                className="material-icons-outlined"
                style={{ color: "#fff", fontSize: 16 }}
              >
                school
              </span>
            </div>
            <strong style={{ fontSize: 18 }}>EduManage</strong>
          </div>

          <nav style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["dashboard", "Dashboard"],
              ["payments", "Fee Management"],
              ["people", "Students"],
            ].map(([icon, label], i) => (
              <div
                key={label}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  backgroundColor: i === 1 ? (dark ? "#1e293b" : "#f1f5f9") : "transparent",
                  fontWeight: i === 1 ? 600 : 500,
                  cursor: "pointer",
                }}
              >
                <span className="material-icons-outlined">{icon}</span>
                {label}
              </div>
            ))}
          </nav>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* HEADER */}
          <header
            style={{
              height: 64,
              backgroundColor: panel,
              borderBottom: `1px solid ${border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 32px",
            }}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className="material-icons-outlined">account_balance_wallet</span>
              <strong>Collect Fee</strong>
            </div>

            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <button
                onClick={() => setDark(!dark)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <span className="material-icons-outlined">dark_mode</span>
              </button>

              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: "#cbd5f5",
                }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWrSdPjqYhJnKU-ibCzGmtqPWYSQJPiNvGmALZTV9Il-D9l8YCVYgJMDyhtRhbzMFIMp9T8_UU98CJT8o3owIejuP91NvDDuv1lXZtmMa1LRefAKEKpuVFomzGXxoNExHmKYO4zG-YR9dVMcqjBLsgPmw0qquicApgQ-wrRUy9LkeLGXo4to_mOMS5os-k3exs_csQQeeT55phc2M9bsSnJ38BJNnEjxNmfz9Ed-vD45Tu0erIfysRWYp-uj9U1yovJz6xyG2zG1bn"
                  alt="avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div style={{ display: "flex", flex: 1 }}>
            {/* FORM */}
            <section
              style={{
                width: 450,
                backgroundColor: panel,
                borderRight: `1px solid ${border}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ padding: 32, flex: 1, overflowY: "auto" }}>
                {[
                  "Student",
                  "Fee Type",
                  "Date",
                  "Total Amount ($)",
                  "Concession ($)",
                  "Remarks",
                ].map((label) => (
                  <div key={label} style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 11, color: muted, marginBottom: 6 }}>
                      {label}
                    </div>
                    <input
                      style={{
                        width: "100%",
                        padding: 12,
                        borderRadius: 10,
                        border: "none",
                        backgroundColor: dark ? "#020617" : "#e5e7eb",
                        color: "#fff",
                      }}
                    />
                  </div>
                ))}

                <div
                  style={{
                    backgroundColor: dark ? "#020617" : "#f1f5f9",
                    padding: 16,
                    borderRadius: 14,
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: muted }}>Net Payable</span>
                  <span>$0.00</span>
                </div>
              </div>

              <div
                style={{
                  padding: 32,
                  borderTop: `1px solid ${border}`,
                }}
              >
                <button
                  style={{
                    width: "100%",
                    padding: 16,
                    borderRadius: 14,
                    border: "none",
                    backgroundColor: "#000",
                    color: "#fff",
                    fontWeight: 700,
                    display: "flex",
                    justifyContent: "center",
                    gap: 8,
                    cursor: "pointer",
                  }}
                >
                  <span className="material-icons-outlined">check_circle</span>
                  Confirm Payment
                </button>
              </div>
            </section>

            {/* EMPTY STATE */}
            <section
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 48,
              }}
            >
              <div style={{ maxWidth: 400 }}>
                <div
                  style={{
                    width: 128,
                    height: 128,
                    borderRadius: "50%",
                    margin: "0 auto 24px",
                    backgroundColor: panel,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    className="material-icons-outlined"
                    style={{ fontSize: 64, color: muted }}
                  >
                    person
                  </span>
                </div>

                <h3 style={{ marginBottom: 8 }}>No Student Selected</h3>
                <p style={{ color: muted }}>
                  Select a student to view payment history and financial insights.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
