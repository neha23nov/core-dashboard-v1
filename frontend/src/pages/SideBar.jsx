import React from 'react'

export default function SideBar() {
  return (
   <div className="flex min-h-screen bg-[#f8fafc] text-slate-900">
       <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
  <div className="px-6 py-5 flex items-center gap-3 font-bold text-lg">
    <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center font-bold">
      M
    </div>
    DEMO SCHOOL
  </div>

  <nav className="flex-1 px-4 space-y-1 text-sm">
    {[
      [ "Dashboard"],
    
      [ "Students", true],
      ["Fees"],

    ].map(([icon, label, active]) => (

      <div
        key={label}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
          active
            ? "bg-black text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        <span className="material-icons-outlined text-[20px]">
          {icon}
        </span>
        {label}
      </div>
    ))}
  </nav>

  <div className="p-4 border-t flex items-center gap-3">
    <img
      className="w-10 h-10 rounded-full"
      src="https://i.pravatar.cc/100"
      alt="admin"
    />
    <div>
      <p className="font-bold text-sm">Admin User</p>
  
    </div>
  </div>
</aside>

    </div>
  )
}
