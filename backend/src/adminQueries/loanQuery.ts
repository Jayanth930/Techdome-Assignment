import { PrismaClient , Term } from "@prisma/client";
// types 
import { NextFunction, Request , Response } from "express";
import { composite } from "../types/dto";
import { v6 as uuid } from "uuid"

const prisma = new PrismaClient()

export async function getAllLoans(req:Request<{},{},{email : string}> , res:Response<composite> , next:NextFunction){
    try {
        const loans = await prisma.loan.findMany({ include : { payer : { select : { email : true , firstName : true}}}});
        res.status(200).json({ responseCode : 1 , message: "Successfully fetched Loans" , data : loans})
    } catch (error) {
        res.status(500).json({ responseCode : 0 , message: "Unable to fetch Loans" })
    }    
}

export async function approveLoans(req:Request<{},{},{ loans : string[]}> , res:Response<composite> , next:NextFunction) {
    const { loans } = req.body
    try {
        for(let i=0;i<loans.length;i++){
            const loanId = loans[i]
            const updatedLoan = await prisma.loan.update({ where : { id : loanId }, data : { status : "APPROVED"}})
            const { term , amount } = updatedLoan
            if(updatedLoan){
                const termDB : Term = { termAmount : amount / term , term : 0 , due : new Date(), loanId , id : "" , createdAT : new Date() , updatedAT : new Date(), status : "PENDING"} 
                const terms = new Array<Term>(term).fill(termDB).map((term,index)=>{
                    const newDueDate = new Date(termDB.due); 
                    newDueDate.setDate(newDueDate.getDate() + (index + 1)* 7);
                    return { 
                        ...term ,
                        id : uuid(),
                        term : index + 1 ,
                        due : newDueDate
                    }
    
                })
                await prisma.term.createMany({ data : terms})
            }
        }
        res.status(200).json({ responseCode : 1 , message : "Successfully approved Loans"})
    } catch (error) {
        res.status(500).json({ responseCode : 0 , message : "Unable to approve Loans  " + error.message})
    }
}