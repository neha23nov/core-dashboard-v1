import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const menuItems = [
    // { label: "Dashboard", path: "/dashboard" },
    { label: "Students", path: "/students" },
    { label: "Fees", path: "/fees" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
      {/* LOGO */}
      <div className="px-6 py-5 flex items-center gap-3 font-bold text-lg">
        <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center font-bold">
          M
        </div>
        DEMO SCHOOL
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 space-y-1 text-sm">
        {menuItems.map(({ label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
                isActive
                  ? "bg-black text-white font-bold"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* USER */}
      <div className="p-4 border-t flex items-center gap-3">
        <img
          className="w-10 h-10 rounded-full"
          src="https://i.pravatar.cc/100"
          alt="admin"
        />
        <div>
          <p className="font-bold text-sm">Admin User</p>
          <p className="text-xs text-slate-500">Principal</p>
        </div>
      </div>
    </aside>
  );
}
