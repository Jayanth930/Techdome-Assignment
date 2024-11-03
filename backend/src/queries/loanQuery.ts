import { PrismaClient } from "@prisma/client";

// types
import { NextFunction, Request , Response } from "express";
import { composite , LoanDTO } from "../types/dto";


const prisma = new PrismaClient()
export async function askLoan(req:Request<{},{},LoanDTO> , res:Response<composite> , next:NextFunction) {
    const { amount , term } = req.body
    const { id } = req.user
    try {
        const loan = await prisma.loan.create({
            data : { amount : parseFloat(amount) , term : parseInt(term) , payerId : id }
        })
        if(!loan){
            res.status(200).json({ responseCode : 2 , message : "Unable to create Loan"})
            return 
        }else{
            res.status(200).json({ responseCode : 1 , message : "Loan created" , data : loan })
            return 
        }
    } catch (error) {
        res.status(500).json({ responseCode : 0 , message : "Error in creating Loan" })
    }
}

export async function getLoans(req:Request<{},{}> , res:Response<composite> , next:NextFunction) {
    const { id } = req.user;
    try {
        const loans = await prisma.loan.findMany({ where : { payerId : id }})
        res.status(200).json({ responseCode : 1 , message : "Successfully fetched Loans" , data : loans})
    } catch (error) {
        res.status(500).json({ responseCode : 0 , message : "Unable to fetch loans"})
    }
}