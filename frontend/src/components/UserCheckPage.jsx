import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import backendUrl from "../config/backendUrl"
export default function UserCheckPage(){
    const emailRef = useRef()
    const navigate = useNavigate()

    async function handleClick(){
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
        <div className="h-screen bg-gray-700 flex justify-center items-center text-slate-200">
            <div className="w-96 h-60 flex flex-col">
                <label htmlFor="email" className="text-lg">Email</label>
                <div className="flex flex-col">
                    <input ref={emailRef}  id="email" name="email" type="email" placeholder="Enter Your email"
                    className="mt-2 block px-3 py-2 bg-white border text-gray-950 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500 peer"
                    />
                    <p className="hidden peer-invalid:block text-pink-600 text-sm">Please provide correct Email Address</p>
                </div>

                <button onClick={handleClick}   className="border rounded-md bg-violet-500 text-slate-300 hover:bg-violet-800 hover:cursor-pointer
                ring-violet-400 text-lg mt-4">Check Email</button>

                <div className="text-center"><p className="text-slate-300">Don't have account? 
                    <a className="text-blue-400 border-b-2 border-b-blue-700 ml-1 cursor-pointer"
                    onClick={()=> navigate("/register")}>SignUp</a></p>
                </div>
            </div>
        </div>
    )
}