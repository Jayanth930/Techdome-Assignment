import jwt from "jsonwebtoken"


// types
import { NextFunction, Request , Response } from "express"
import { failure } from "../types/dto"

export default function authenticateUser(req:Request,res:Response<failure>,next:NextFunction) {
    const authHeader  = req.headers['authorization']
    if(!authHeader) {
        res.sendStatus(401)
        return 
    }
    const token = authHeader.trim().split(" ")[1]
    if(!token){
        res.sendStatus(401)
        return
    }
        try {
            const user = jwt.verify(token , process.env.SECRET) as jwt.JwtPayload
            if(typeof user === "object"){
                req.user = { email : user.email , id : user.id }
            }else{
                throw new Error("Invalid JWT Token")
            }
            next()
        } catch (error) {
            let statuscode : number , failure  = { } as failure;
            if(error instanceof jwt.TokenExpiredError){
                statuscode = 401
                failure["responseCode"] = 2 ,
                failure["message"] = "Token is expired"
            }else if(error instanceof jwt.JsonWebTokenError){
                statuscode = 403
                failure["responseCode"] = 3 ,
                failure["message"] = "Invalid Token"
            }else{
                statuscode = 500
                failure["responseCode"] = 0 ,
                failure["message"] = `Error with server ${error.message}`
            }
            res.status(statuscode).json(failure)
        }
        
    
}