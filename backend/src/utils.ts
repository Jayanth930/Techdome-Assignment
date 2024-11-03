import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

// types
import { Payload } from "./types/dto"

export async function gethashedPassword(password : string) {
    const saltrounds = 10
    return await bcrypt.hash(password , saltrounds)
}


export const generateAccesstoken = (payload : Payload)=>{
    try {
        return jwt.sign(payload , process.env.SECRET , { expiresIn : '7d' })
    } catch (error) {
        throw new Error(error.message)
    }
}