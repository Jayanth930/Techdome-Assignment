import { useEffect, useState } from "react"
import backendUrl from "../config/backendUrl"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function LoanDashboard(){
    
    const [loans , setLoans] = useState([]);
    const navigate = useNavigate()
    useEffect(()=>{
        // fetch the Loans of the user
        const accessToken = localStorage.getItem("accesstoken");
        if(!accessToken) navigate("/login");

        fetchLoans(accessToken).then(()=>console.log(loans))
    },[])

    async function fetchLoans(accessToken) {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/loan`,{
                headers : {
                    Authorization : `Bearer ${accessToken}`
                }
            })
            if(data.responseCode === 1){
                setLoans(data.data)
            }
        } catch (error) {
            console.log("Error "+error.message)
        }
    }
    return(
        <div className="mx-auto w-[75%] overflow-x-auto">
            <h2 className="m-10 text-center text-lg font-bold tracking-tight text-gray-900">
                   Loans
            </h2>
            <table className="w-full text-left border border-separate rounded border-slate-200" cellspacing="0">
                <tbody>
                    <tr>
                        <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Sl No</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Amount</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Terms</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Created On</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Status</th>
                    </tr>
                    {loans.map((loan, index)=>{
                        const { id , amount , term , status , createdAT } = loan
                        return (
                            <tr className="transition-colors duration-300 hover:bg-slate-50" key={id}>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{index+1}</td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{formatAmount(amount)}</td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{term}</td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{formatDateString(createdAT)}</td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{getbackgroundColor(status)}</td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

function TableWithHover() {  
  
}

function formatDateString(dateString) {
    // The datstring passed will look like -> 02-11-2024T10:15:52.586
    const [datePart, timePart] = dateString.split('T');
    const [day, month, year] = datePart.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    
    return formattedDate;
}

function formatAmount(amount) {
    return parseFloat(amount).toFixed(2)
}

function getbackgroundColor(status){
    if(status === "PENDING"){
        return "bg-red-200"
    }else if(status === "APPROVED"){
        return "bg-lime-700"
    }else{
        // paid
        return "bg-yellow-700"
    }
}