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
        <div className="h-full bg-gray-800 flex justify-center items-center text-slate-200">
            <table className="w-[75%] text-left table-auto min-w-max overflow-y-auto">
                <thead>
                    <tr>
                        <th className="p-4 border-b border-slate-600 bg-slate-700">
                            <p className="text-sm font-normal leading-none text-slate-300">
                                Sl No
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-600 bg-slate-700">
                            <p className="text-sm font-normal leading-none text-slate-300">
                                Amount
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-600 bg-slate-700">
                            <p className="text-sm font-normal leading-none text-slate-300">
                                Terms
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-600 bg-slate-700">
                            <p className="text-sm font-normal leading-none text-slate-300">
                                Created On
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-600 bg-slate-700">
                            <p className="text-sm font-normal leading-none text-slate-300">
                                Status
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {loans.map((loan, index)=>{
                        const { id , amount , term , status , createdAT } = loan
                        return (
                            <tr className="hover:bg-slate-700" key={id}>
                                <td className="p-4 border-b border-slate-700">
                                    <p className="text-sm text-slate-100 font-semibold">
                                        {index+1}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-slate-700">
                                    <p className="text-sm text-slate-300">
                                    {formatAmount(amount)}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-slate-700">
                                    <p className="text-sm text-slate-300">
                                        {term}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-slate-700">
                                    <p className="text-sm text-slate-300">
                                        {formatDateString(createdAT)}
                                    </p>
                                </td>
                                <td className={`p-4 border-b border-slate-700 ${getbackgroundColor(status)}`}>
                                    <p className="text-sm text-black">
                                        {status}
                                    </p>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
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