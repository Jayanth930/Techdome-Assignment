import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import backendUrl from "../config/backendUrl";
import axios from "axios"
import { toast } from "react-toastify";
export default function LoginPage(){
    const [open , setOpen ] = useState(false);
    const navigate = useNavigate()
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("")
    async function handleSubmit(e){
        e.preventDefault();
        const loginData = { email , password};
        console.log(loginData)
        try {
            const { data } = await axios.post(`${backendUrl}/api/v1/auth/login`,loginData);
            if(data.responseCode == 1){
                // Successfully Authenticated User
                // store the accessToken 
                const accessToken = data.data
                localStorage.setItem("accesstoken",accessToken);
                toast.success("Redirected to Home page")
                setTimeout(()=>navigate("/home"),2000)
            }else if(data.responseCode === 2){
                toast.success("Redirected to Profile page")
                setTimeout(()=>navigate("/profile"),2000)
                
            }else if(data.responseCode === 3){
                toast.error("Incorrect Password")
                setIsCorrectPassword(false)
            }
        } catch (error) {
            console.log("Error "+error.message)
        }
    }
    return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Login in to your account
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
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password <span className="text-pink-600">*</span>
                            </label>
                        </div>
                        <div className="relative mt-2">
                            <input
                            id="password"
                            name="password"
                            type={open ? "text" : "password"}
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-2"
                            />
                            <div  className="absolute cursor-pointer right-0 bottom-2" onClick={()=>setOpen((prev)=>!prev)} >
                                {
                                !open ? <svg  className="text-black" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" color="#364055" height="22" width="22" xmlns="http://www.w3.org/2000/svg" ><path d="M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448zm-176.34-64c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58 2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1 204.8 204.8 0 0 1-51.16 6.47zm235.18-145.4c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83 2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1 192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16 310.72 310.72 0 0 1-64.12 72.73 2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13 343.49 343.49 0 0 0 68.64-78.48 32.2 32.2 0 0 0-.1-34.78z"></path><path d="M256 160a95.88 95.88 0 0 0-21.37 2.4 2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160zm-90.22 73.66a2 2 0 0 0-3.38 1 96 96 0 0 0 115 115 2 2 0 0 0 1-3.38z"></path></svg>
                                : <svg className="text-black" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"  color="#364055" height="22" width="22" xmlns="http://www.w3.org/2000/svg" ><path fill="none" strokeLineCap="round" strokeLineJoin="round" strokeWidth="32" d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z"></path><circle cx="256" cy="256" r="80" fill="none" strokeMiterlimit="10" strokeWidth="32"></circle></svg>    
                                } 
                            </div> 
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Sign in
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