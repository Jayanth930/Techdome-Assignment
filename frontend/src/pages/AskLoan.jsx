import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backendUrl from "../config/backendUrl"
import axios from "axios"
import { toast } from "react-toastify";

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
                toast.success("Successfully created Loan")
                setTimeout(()=>navigate("/home/loan"),[2000])
                
            }else{
                toast.error("Error in creating Loan"+data.message)
            }
        } catch (error) {
            // Toast representing error
            console.log("Error in creating Loan "+error.message)
        }
    }
    return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                   Provde Loan Amount and Term
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="loanAmount" className="block text-sm/6 font-medium text-gray-900">
                            Loan Amount <span className="text-pink-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                            id="loanAmount"
                            name="loanAmount"
                            type="number"
                            required
                            value={amount}
                            placeholder="Enter Loan Amount"
                            onChange={(e)=>setAmount(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-2"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="term" className="block text-sm/6 font-medium text-gray-900">
                                Term <span className="text-pink-600">*</span>
                            </label>
                        </div>
                        <div className="relative mt-2">
                            <input
                            id="term"
                            name="term"
                            type="number"
                            required
                            value={term}
                            placeholder="Enter Term"
                            onChange={(e)=>setTerm(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-2"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}