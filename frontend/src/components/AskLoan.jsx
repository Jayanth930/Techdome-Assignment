import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import backendUrl from "../config/backendUrl"
import axios from "axios"

export default function AskLoan(){
    const [amount , setAmount] = useState("");
    const [term , setTerm] = useState("");
    const navigate = useNavigate()
    const accessToken = localStorage.getItem("accesstoken")
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const loanData = { amount , term }
            const { data } = await axios.post(`${backendUrl}/api/v1/loan`,loanData,{
                headers : {
                    Authorization : `Bearer ${accessToken}`
                }
            })
            if(data.responseCode === 1){
                navigate("/home/loan");
            }else{
                console.log("Error in creating Loan "+data.message)
            }
        } catch (error) {
            
        }
    }
    return(
        <div className="h-full bg-gray-700 flex justify-center items-center text-slate-200">
            <form className="w-96 flex flex-col h-60 justify-around" onSubmit={handleSubmit} >
                <div className="flex flex-col">
                    <label htmlFor="loan" className="text-lg">Enter Amount</label>
                    <input  id="loan" name="loan" type="number" placeholder="Enter Your Loan Amount" value={amount}
                    className="mt-2 block px-3 py-2 bg-white border text-gray-950 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    onChange={(e)=>setAmount(e.target.value)}
                    />
                </div>
                <div className="flex flex-col relative">
                    <label htmlFor="term" className="text-lg">Term</label>
                    <input id="term" name="term" type="number" placeholder="Enter Your Term" value={term}
                    className="mt-2 block px-3 py-2 bg-white border text-gray-950 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    onChange={(e)=> setTerm(e.target.value) }
                    />
                                   
                </div>
                <button type="submit" className="border rounded-md bg-violet-500 text-slate-300 hover:bg-violet-800 hover:cursor-pointer
                ring-violet-400 text-lg">Ask For Loan</button>
            </form>
        </div>
    )
}