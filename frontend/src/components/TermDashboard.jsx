import { useEffect, useState } from "react"
import backendUrl from "../config/backendUrl"
import axios from "axios"

export default function TermDashboard(){

    const [upocomingTerms , setUpcomingTerms] = useState([]);
    const [pastPendingTerms , setPastPendingTerms] = useState([]);

    useEffect(()=>{
        const accessToken = localStorage.getItem("accesstoken");
        fetchupcomingTerms(accessToken)
        fetchPastPendingTerms(accessToken)
    },[])

    async function fetchupcomingTerms(accessToken){
          try {
            const { data } = await axios.get(`${backendUrl}/api/v1/term/pending/upcoming`,{
                headers : { Authorization : `Bearer ${accessToken}`}
            })
            if(data.responseCode == 1){
                setUpcomingTerms(data.data) // [{ termData },{ termData },{ termData },,,,,,]
            }else{
                console.log("Error "+data.message)
            }   
          } catch (error) {
                console.log("Error "+error.message)
          }
    }
    async function fetchPastPendingTerms(accessToken) {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/term/pending/past`,{
                headers : { Authorization : `Bearer ${accessToken}`}
            })
            if(data.responseCode == 1){
                setPastPendingTerms(data.data) // [{ pastPendingTerms : [......] } , { pastPendingTerms : [......] } , .....]
            }else{ 
                console.log("Error "+data.message)
            }   
          } catch (error) {
                console.log("Error "+error.message)
          }
    }
    return (
        <div className="h-full bg-gray-800 flex flex-col text-slate-200 border-2 border-b-orange-500">
            <div className="flex-1 flex flex-col">
                <h3>Upcomimng Terms </h3>
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
                                    due
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
                    {upocomingTerms.map((Term, index)=>{
                            const { id , termAmount , term , status , due } = Term
                            return (
                                <tr className="hover:bg-slate-700" key={id}>
                                    <td className="p-4 border-b border-slate-700">
                                        <p className="text-sm text-slate-100 font-semibold">
                                            {index+1}
                                        </p>
                                    </td>
                                    <td className="p-4 border-b border-slate-700">
                                        <p className="text-sm text-slate-300">
                                        {formatAmount(termAmount)}
                                        </p>
                                    </td>
                                    <td className="p-4 border-b border-slate-700">
                                        <p className="text-sm text-slate-300">
                                            {term}
                                        </p>
                                    </td>
                                    <td className="p-4 border-b border-slate-700">
                                        <p className="text-sm text-slate-300">
                                            {formatDateString(due)}
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
            <br></br>
            <div className="flex-1 flex flex-col">
                <h3>Past Pending Terms</h3>
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
                                    due
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
                    {pastPendingTerms.map((pastTerms, index)=>{
                        const { pastPendingTerms } = pastTerms
                        pastPendingTerms.map((Term,index)=>{
                            const { id , termAmount , term , status , due } = Term
                            return (
                                <tr className="hover:bg-slate-700" key={id}>
                                <td className="p-4 border-b border-slate-700">
                                    <p className="text-sm text-slate-100 font-semibold">
                                        {index+1}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-slate-700">
                                    <p className="text-sm text-slate-300">
                                    {formatAmount(termAmount)}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-slate-700">
                                    <p className="text-sm text-slate-300">
                                        {term}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-slate-700">
                                    <p className="text-sm text-slate-300">
                                        {formatDateString(due)}
                                    </p>
                                </td>
                                <td className={`p-4 border-b border-slate-700 ${getbackgroundColor(status)}`}>
                                    <p className="text-sm text-black">
                                        {status}
                                    </p>
                                </td>
                            </tr>
                        )})
                     })}
                    </tbody>
                </table>
            </div>
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
        return "bg-yellow-600"
    }else{
        return "bg-lime-700"
    }
}