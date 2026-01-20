import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";



export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    api.get(`/students/${id}`).then((res) => setStudent(res.data));
  }, [id]);

  if (!student) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{student.fullName}</h1>
      <p>ID: {student.studentId}</p>
      <p>Class: {student.classSection}</p>
      <p>Status: {student.status}</p>
    </div>
  );
}
