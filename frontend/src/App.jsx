import { Routes, Route } from "react-router-dom";
import StudentManagement from "./pages/studentManage";
import StudentDetails from "./pages/StudentDetails";

import FeeDashboard from "./pages/FeeDashboard";
import CollectFee from "./pages/CollectFee";
export default function App() {
  return (
   
      <Routes>
        <Route path="/" element={<StudentManagement />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/fees" element={<FeeDashboard />} />
      <Route path="/fees/collect" element={<CollectFee />} />

      </Routes>
    
  );
}
