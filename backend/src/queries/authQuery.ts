import { PrismaClient , UserStatus } from "@prisma/client";
import { generateAccesstoken, gethashedPassword } from "../utils";
import bcrypt from "bcrypt"
// types 
import { NextFunction, Request , Response } from "express";
import { User } from "@prisma/client";
import { composite, credentials } from "../types/dto"

const prisma = new PrismaClient()


// checking user status in registration process
export async function getUserStatus(req:Request<{},{},{email : string}> , res:Response<composite> , next:NextFunction) {
    const { email } = req.body;
    try{
        const user = await prisma.user.findUnique({ where : { email }});
        if(!user){
            res.status(200).json({ responseCode : 1 , message : "User not found redirect to Register page"})
        }else{
            const { status } = user
            if(status === "ACTIVE"){
                // profile completed , so redirect to Login Page.
                res.status(200).json({responseCode : 2 , message : "User found redirect to login page"});
            }else{
                // only registered , profile not completed , so redirect to Profile Page
                res.status(200).json({responseCode : 3 , message : "User found redirect to Profile Page"});
            }
        }
    }catch(error){
        res.status(500).json({ responseCode : 0 , message : "Error in fetching user status"})
    }
}



// creating a user
export async function createUser(req:Request<{},{},User> , res:Response<composite> , next:NextFunction) {
    const { email , password } = req.body
    try {
        const hash = await gethashedPassword(password);
        const user = await prisma.user.create({
            data : {
                email , password : hash  
            }
        })
        res.status(201).json({ responseCode : 1 , message : "Successfully created user" , data : user as User})
    } catch (error) {
        res.status(500).json({ responseCode : 0 , message : "Failed to create user"})
    }
}

// complete the profile of the user
export async function completeProfile(req:Request<{},{},Partial<User>,{ email : string}>, res:Response<composite> , next:NextFunction){
    const { firstName , lastName , phoneNo } = req.body
    const { email } = req.query
    console.log(email,req.body)
    try {
        let data : Partial<User>
        if(lastName){
            data = { ...req.body }
        }else{
            data = { firstName , phoneNo }
        }
        const user = await prisma.user.update({
            where : { email } , 
            data : { ...data , status : "ACTIVE"}
        })
        if(!user) res.status(200).json({ responseCode : 2 , message : "Email Not Found"})
        else res.status(200).json({ responseCode : 1 , message : "Successfully updated the user , redirect to Login Page"})
    } catch (error) {
        res.status(500).json({ responseCode : 0 , message : "Error in updating user"})
    }
}

// Validate User 
export async function validateUser(req:Request<{},{},credentials>, res:Response<composite> , next:NextFunction) {
    const { email , password } = req.body;
    const user = await prisma.user.findUnique({ where : { email }});
    try {
        const {password : hash , status , id } = user;
        const isValid = await bcrypt.compare(password,hash);
        if(isValid){
            const accessToken = generateAccesstoken({ email , id })
            if(status === UserStatus.VERIFIED){
                res.status(200).json({ responseCode : 2 , message : "Redirect to profile page" , data : accessToken})
            }else{
                // profile is also completed , redirect to home page
                res.status(200).json({ responseCode : 1 , message : "Redirect to Home page" , data : accessToken})
            }
        }else{
            res.status(200).json({ responseCode : 3 , message : "Incorrect Passoword"})
        }
    } catch (error) {
        res.status(500).json({ responseCode : 0 , message : "Error in validating user : "+error.message})
    }

}