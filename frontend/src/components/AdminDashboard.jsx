import { useEffect, useMemo, useState } from "react"
import backendUrl from "../config/backendUrl"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function AdminDashboard(){
    
    const [loans , setLoans] = useState([]);
    const navigate = useNavigate()
    const [approveIds , setApproveIds] = useState([]);
    const accessToken = localStorage.getItem("accesstoken");
    useEffect(()=>{
        // fetch the Loans of the user
        if(!accessToken) navigate("/login");

        fetchLoans(accessToken).then(()=>console.log(loans))
    },[])

    async function fetchLoans(accessToken) {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/admin/loan`,{
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

    async function handleClick(e) {
        if(approveIds.length == 0) return;
        console.log(approveIds,accessToken)
        try {
            const { data } = await axios.put(`${backendUrl}/api/v1/admin/loan/approve`, {loans : approveIds}, {
                headers : {
                    Authorization : `Bearer ${accessToken}`
                }
            })
            if(data.responseCode === 1){
                // toast -> successfully approved Loans
                navigate(0)
            }else{
                console.log("Error "+data.message)
            }
        } catch (error) {
            console.log("Error "+error.message)
        }
    }
    return(
        <div className="mx-auto overflow-x-auto flex flex-col items-center">
            <h2 className="m-10 text-center text-lg font-bold tracking-tight text-gray-900">
                   Loans
            </h2>
            <table className="w-full text-left border border-separate rounded border-slate-200" cellSpacing="0">
                <tbody>
                    <tr>
                        <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Sl No</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Payer Name</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Payer Email</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Amount</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Terms</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Created On</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Status</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Approve</th>
                    </tr>
                    {loans.map((loan, index)=>{
                        const { id , amount , term , status , createdAT , payer } = loan
                        const { firstName , email } = payer // Ideally if loan present , Payer will be there
                        return (
                            <tr className="transition-colors duration-300 hover:bg-slate-50" key={id}>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{index+1}</td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{firstName}</td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{email}</td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{formatAmount(amount)}</td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{term}</td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{formatDateString(createdAT)}</td>
                                <td className={`h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ${getbackgroundColor(status)}`}>{status}</td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                                    { status === "PENDING" ? <CheckBox  approveIds={approveIds}  id={id} setApproveIds={setApproveIds} /> : "------------"}
                                </td>
                            </tr>)
                    })}
                </tbody>
            </table>
            <div>
                <button
                    onClick={handleClick}
                    className="mt-10 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Save
                </button>
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

function CheckBox({ approveIds , id , setApproveIds}){
    const [ checked , setChecked ] = useState(false);

    useEffect(()=>{
        if(checked){
            setApproveIds((prev)=>[...prev , id])
        }else{
            const remaining = approveIds.filter((other)=> other!=id)
            setApproveIds(remaining);
        }
    },[checked])
    return (
        <div className="relative flex flex-wrap items-center">
        <input className="w-4 h-4 transition-colors bg-white border-2 rounded appearance-none cursor-pointer focus-visible:outline-none peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-200 checked:hover:border-emerald-600 checked:hover:bg-emerald-300 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-400 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50" type="checkbox" id="id-c04" checked={checked} onChange={(e)=>setChecked((prev)=>!prev)}/>
        <label className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400" htmlFor="id-c04">
            Approve
        </label>
        <svg className="absolute left-0 w-4 h-4 transition-all duration-300 -rotate-90 opacity-0 pointer-events-none top-1 fill-emerald-500 stroke-emerald-500 peer-hover:fill-emerald-600 peer-hover:stroke-emerald-600 peer-focus:fill-emerald-700 peer-focus:stroke-emerald-700 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" aria-labelledby="title-01 description-01" role="graphics-symbol">
            <title id="title-01">Check mark icon</title>
            <desc id="description-01">
            Approve the loan
            </desc>
            <path fillRule="evenodd" clipRule="evenodd" d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z" />
        </svg>
        </div>
    )
}