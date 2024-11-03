import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import backendUrl from "../config/backendUrl"


export default function UserCheckPage(){
    const navigate = useNavigate()
    const [email , setEmail] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        const email = emailRef.current.value
        if(!email.includes("@gmail.com")){
            return;
        }
        try {
            const { data } = await axios.post(`${backendUrl}/api/v1/auth/check`,{ email })
            if(data.responseCode == 1){
                navigate("/register");
            }else if(data.responseCode == 2){
                navigate("/login");
            }else if(data.responseCode == 3){
                navigate("/profile",{
                    state : {
                        email 
                    }
                })
            }else{
                // Toast with error 
                console.log("Error "+data.message)
            }
        } catch (error) {
            console.log("Error "+error.message)
        }

    }
    return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Provide your Email Address
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address <span className="text-pink-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            autoComplete="email"
                            className="peer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-2
                            invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                            />
                            <p className="hidden peer-invalid:block text-pink-600 text-sm">Please provide correct Email Address</p>
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

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Not a member?{` `}
                    <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}