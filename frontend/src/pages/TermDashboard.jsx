import { useEffect, useState } from "react"
import backendUrl from "../config/backendUrl"
import Modal from "../components/Modal"
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
        <div className="h-full w-[75%] overflow-x-auto flex flex-col">
            <div className="flex-[1_1_0]">
                <h2 className="text-center text-lg font-bold tracking-tight text-gray-900">
                    Upcoming Terms
                </h2>
                <table className="w-full text-left border border-separate rounded border-slate-200" cellSpacing="0">
                    <tbody>
                        <tr key={2}>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Sl No</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Amount</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Terms</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Created On</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Status</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Pay Term</th>
                        </tr>
                        {upocomingTerms.map((Term, index)=>{
                            const { id , termAmount , term , status , due } = Term
                            return (
                                <tr className="transition-colors duration-300 hover:bg-slate-50" key={id}>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{index+1}</td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{formatAmount(termAmount)}</td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{term}</td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{formatDateString(due)}</td>
                                    <td className={`h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ${getbackgroundColor(status)}`}>{status}</td>
                                    <td className={`h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500`}><Modal amount={termAmount}  id={id}/></td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex-[1_1_0]">
                <h2 className="text-center text-lg font-bold tracking-tight text-gray-900">
                    Past Pending Terms
                </h2>
                <table className="w-full text-left border border-separate rounded border-slate-200" cellSpacing="0">
                    <tbody>
                        <tr key={1}>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Sl No</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Amount</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Terms</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Created On</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Status</th>
                        </tr>
                        {pastPendingTerms.map((Term, index)=>{
                            const { id , termAmount , term , status , due } = Term
                            return (
                                <tr className="transition-colors duration-300 hover:bg-slate-50" key={id}>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{index+1}</td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{formatAmount(termAmount)}</td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{term}</td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{formatDateString(due)}</td>
                                    <td className={`h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ${getbackgroundColor(status)}`}>{status}</td>
                                </tr>)
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
        return "bg-red-200"
    }else if(status === "APPROVED"){
        return "bg-yellow-400"
    }else{
        // paid
        return "bg-lime-400"
    }
}