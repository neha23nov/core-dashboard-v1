import React, { useEffect, useState } from "react";
import api from "../api/axios";
import SideBar from "../components/SideBar";


export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // ADD STUDENT MODAL
  const [showModal, setShowModal] = useState(false);

  // VIEW STUDENT MODAL
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    classSection: "",
    gpa: "",
  });

  // FETCH STUDENTS
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/students", {
        params: { search },
      });
      setStudents(res.data.students || []);
    } catch (err) {
      console.error("Fetch students error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  // ADD STUDENT
  const addStudent = async () => {
    try {
      await api.post("/students", {
        ...formData,
        status: "ACTIVE",
        attendance: 95,
        guardian: "Robert Johnson",
        contact: "+1555-0101",
      });

      setShowModal(false);
      setFormData({
        fullName: "",
        studentId: "",
        classSection: "",
        gpa: "",
      });

      fetchStudents();
    } catch (err) {
      console.error("Add student error:", err);
      alert("Failed to add student");
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900">
      <SideBar />
      {/* SIDEBAR */}
      {/* SIDEBAR */}
{/* <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
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
</aside> */}


      {/* MAIN */}
      <main className="ml-64 flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Student Management</h1>

        {/* SEARCH + ADD */}
        <div className="flex justify-between mb-6">
          <input
            className="border px-4 py-2 rounded w-80"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            Add Student
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase">
              <tr>
                <th className="p-4 text-left">Student</th>
                <th>Status</th>
                <th>Class</th>
                <th>GPA</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s._id} className="border-t">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={`https://i.pravatar.cc/100?u=${s.studentId}`}
                        alt=""
                      />
                      <div>
                        <p className="font-semibold">{s.fullName}</p>
                        <p className="text-xs text-slate-500">
                          ID: {s.studentId}
                        </p>
                      </div>
                    </td>

                    <td>
                      <span className="px-3 py-1 rounded-full bg-black text-white text-xs">
                        {s.status}
                      </span>
                    </td>

                    <td>{s.classSection}</td>
                    <td>{s.gpa || 0}</td>

                    <td>
                      <button
                        className="text-blue-600 font-semibold"
                        onClick={() => setSelectedStudent(s)}
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

      {/* ADD STUDENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">Add Student</h2>

            <input
              className="w-full border p-2 mb-2"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-2"
              placeholder="Student ID"
              value={formData.studentId}
              onChange={(e) =>
                setFormData({ ...formData, studentId: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-2"
              placeholder="Class Section"
              value={formData.classSection}
              onChange={(e) =>
                setFormData({ ...formData, classSection: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-4"
              placeholder="GPA"
              type="number"
              value={formData.gpa}
              onChange={(e) =>
                setFormData({ ...formData, gpa: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="bg-black text-white px-4 py-2"
                onClick={addStudent}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT PROFILE MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl overflow-hidden">
            <div className="bg-black text-white p-6 flex justify-between">
              <div className="flex items-center gap-4">
                <img
                  className="w-16 h-16 rounded-full"
                  src={`https://i.pravatar.cc/150?u=${selectedStudent.studentId}`}
                  alt=""
                />
                <div>
                  <h2 className="text-xl font-bold">
                    {selectedStudent.fullName}
                  </h2>
                  <p className="text-sm">
                    {selectedStudent.classSection} • ACTIVE
                  </p>
                </div>
              </div>

              <button onClick={() => setSelectedStudent(null)}>✕</button>
            </div>

            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="border rounded p-4">
                <p className="text-xs text-slate-500">GPA</p>
                <p className="text-2xl font-bold">{selectedStudent.gpa || 0}</p>
              </div>

              <div className="border rounded p-4">
                <p className="text-xs text-slate-500">Attendance</p>
                <p className="text-2xl font-bold">
                  {selectedStudent.attendance || 95}%
                </p>
              </div>
            </div>

            {/* <div className="p-6 border-t">
              <h3 className="font-bold mb-2">Parent Information</h3>
              <p>Guardian: {selectedStudent.guardian || "Robert Johnson"}</p>
              <p>Contact: {selectedStudent.contact || "+1555-0101"}</p>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
