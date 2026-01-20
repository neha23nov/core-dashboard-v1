import { Routes, Route } from "react-router-dom";
import StudentManagement from "./pages/studentManage";
import StudentDetails from "./pages/StudentDetails";
import EditFeeModal from "./pages/EditFeeModal";
import FeeView from "./pages/FeeView";



import FeeDashboard from "./pages/FeeDashboard";
import CollectFee from "./pages/CollectFee";
export default function App() {
  return (
   
      <Routes>
        <Route path="/" element={<StudentManagement />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/fees" element={<FeeDashboard />} />
      <Route path="/fees/collect" element={<CollectFee />} />
      <Route path="/EditFeeModal/:id" element={<EditFeeModal />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
<Route path="/students" element={<StudentManagement />} />
<Route path="/fees" element={<FeeDashboard />} />
<Route path="/fees/view/:refId" element={<FeeView />} />



      </Routes>
    
  );
}
