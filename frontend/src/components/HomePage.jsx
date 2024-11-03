import { Outlet, Route, Routes } from "react-router-dom";
import AskLoan from "./AskLoan";
import LoanDashboard from "./LoanDashboard";
import TermDashboard from "./TermDashboard"
import SideBar from "./SideBar";
export default function HomePage() {

  return (
    <div className="relative w-screen h-screen flex">
      <SideBar />
      <div className="flex-1 flex justify-center">
        <Outlet />
        <Routes>
            <Route path="/" element={<AskLoan />}/>
            <Route path="/loan" element={<LoanDashboard />}/>
            <Route path="/term" element={<TermDashboard />}/>
        </Routes>   
      </div>
    </div>
  )
}