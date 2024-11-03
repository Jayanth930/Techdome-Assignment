import { useEffect, useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import backendUrl from "../config/backendUrl";
import axios from "axios"

export default function ProfilePage(){
    const [isfirstNameValid , setisFirstNameValid] = useState(true)
    const [islastNameValid , setisLastNameValid] = useState(true)
    const [isphoneNoValid , setisphoneNoValid] = useState(true);
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [phoneNo , setPhoneNo] = useState("");
    const location = useLocation()
    const email = location.state?.email
    const navigate = useNavigate()
    async function handleClick(){
        const profileData = {
            firstName , lastName , phoneNo
        }
        
        if(firstName.match(/\d/) && firstName.match(/\d/).length != 0  || 
            lastName.match(/\d/) && lastName.match(/\d/).length != 0 || 
            phoneNo.length != 10
        ) return;

        try {
            const { data } = await axios.post(`${backendUrl}/api/v1/auth/profile?email=${email}`,profileData)
            if(data.responseCode == 2){
                // email not found toast should appear
            }else if(data.responseCode == 1){
                // successfully registered can go to home page
                navigate("/home")
            }else{
                // an error occured
                console.log("Error "+data.message)
            }
        } catch (error) {
            console.log("Error "+error.message)
        }
    }
    useEffect(()=>{
        if(firstName.match(/\d/) && firstName.match(/\d/).length != 0){
            setisFirstNameValid(false)
        }else{
            setisFirstNameValid(true)
        }

        if(lastName.match(/\d/) && lastName.match(/\d/).length != 0){
            setisLastNameValid(false)
        }else{
            setisLastNameValid(true)
        }

        if(phoneNo && phoneNo.length != 10){
            setisphoneNoValid(false)
        }else{
            setisphoneNoValid(true)
        }
    },[firstName,lastName,phoneNo])
    return (
        <div className="h-screen bg-gray-700 flex justify-center items-center text-slate-200">
            <div className="flex flex-col w-96 h-60 justify-around">
                    <div className="flex flex-col">
                        <label htmlFor="fname" className="text-lg">Email</label>
                        <input disabled={true} id="fname" name="fname" type="email" value={email ? email : "Email Not found"}
                        className="mt-2 block px-3 py-2  border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-gray-600 disabled:text-white disabled:border-slate-200 disabled:shadow-none"
                        />
                       
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="fname" className="text-lg">First name</label>
                        <input id="fname" name="fname" type="text" placeholder="Enter Your first name" value={firstName}
                        className="mt-2 block px-3 py-2 bg-white border text-gray-950 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        onChange={(e)=>setFirstName(e.target.value)}
                        />
                        <p className={`${isfirstNameValid ? "hidden" : "block"} text-pink-600 text-sm`}>
                            Name should not contains digits
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lname" className="text-lg">Last name</label>
                        <input id="lname" name="lname" type="text" placeholder="Enter Your last name" value={lastName}
                        className="mt-2 block px-3 py-2 bg-white border text-gray-950 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        onChange={(e)=>setLastName(e.target.value)}
                        />
                         <p className={`${islastNameValid ? "hidden" : "block"} text-pink-600 text-sm`}>
                            Name should not contains digits
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lname" className="text-lg">Phone No <span className="text-red-500">*</span></label>
                        <input id="lname" name="lname" type="number" placeholder="Enter Your phoneNumber" value={phoneNo}
                        className="mt-2 block px-3 py-2 bg-white border text-gray-950 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        onChange={(e)=>setPhoneNo(e.target.value)}
                        />
                        <p className={`${isphoneNoValid ? "hidden" : "block"} text-pink-600 text-sm`}>
                            Phone Number should be of 10 digits
                        </p>
                    </div>
                    
                    <button type="submit"  onClick={handleClick}  className=" mt-6 border rounded-md bg-violet-500 text-slate-300 hover:bg-violet-800 hover:cursor-pointer
                ring-violet-400 text-xl">Create Profile</button>        
            </div>
        </div>
    )
}