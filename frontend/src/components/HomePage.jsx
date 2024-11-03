import { Link, Outlet, Route, Routes } from "react-router-dom";
import AskLoan from "./AskLoan";
import LoanDashboard from "./LoanDashboard";
import TermDashboard from "./TermDashboard"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function HomePage(){
    const navigate = useNavigate()

    useEffect(()=>{
        const accessToken = localStorage.getItem("accesstoken")
        if(!accessToken) navigate("/login")
    },[])

    return (
        <div className="h-screen flex flex-col">
            {/* <div className="h-20"> Header </div> */}
            <div className="flex flex-1">
              <div id="sidebar" className="flex-[1_1_25%] flex flex-col ">
                 <Link className="w-full h-10 bg-blue-400 text-slate-200 flex justify-center items-center border-2 border-b-orange-600" to="/home" >Ask Loan</Link>
                 <Link className="w-full h-10 bg-blue-400 text-slate-200 flex justify-center items-center border-2 border-b-orange-600" to="/home/loan" >Loan Dshboard</Link>
                 <Link className="w-full h-10 bg-blue-400 text-slate-200 flex justify-center items-center border-2 border-b-orange-600" to="/home/term" >Term Dshboard</Link>
              </div>
              <div className="flex-[2_1_75%]">
                <Outlet />
                <Routes>
                    <Route path="/" element={<AskLoan />}/>
                    <Route path="/loan" element={<LoanDashboard />}/>
                    <Route path="/term" element={<TermDashboard />}/>
                </Routes>
              </div>
            </div>
        </div>
    )
}