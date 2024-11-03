import { PrismaClient } from "@prisma/client";

//types
import { Request , Response , NextFunction} from "express";
import { composite } from "../types/dto";

const prisma = new PrismaClient()


export async function getUpcomingTerms(req:Request , res:Response<composite> , next:NextFunction) {
   const { id } = req.user;
   try {
        const loans = await prisma.loan.findMany({ where : { payerId : id }});
        const results = loans.map(async (loan)=>{
            const term = await prisma.term.findFirst({ where : { loanId : loan.id , status : "PENDING", due : { gt : new Date()}} , orderBy : { due : "asc"}});
            return term
        })
        const terms = await Promise.all(results)
        const termsOut = terms.filter((term)=>term!=null)
        res.status(200).json({ responseCode : 1 , message : "Successfully fetched Pending Terms for all Loans" , data : termsOut})
   } catch (error) {
        res.status(500).json({ responseCode : 0 , message : error.message })
   }
}

export async function getPastPendingTerms(req:Request , res:Response<composite> , next:NextFunction) {
     const { id } = req.user;
     try {
          const loans = await prisma.loan.findMany({ where : { payerId : id }});
          const results = loans.map(async (loan)=>{
              const terms = await prisma.term.findMany({ where : { loanId : loan.id , status : "PENDING", due : { lt : new Date()}} , orderBy : { due : "asc"}});
              return{ 
                pastPendingTerms : terms 
              }
          })
          const terms = await Promise.all(results)
          res.status(200).json({ responseCode : 1 , message : "Successfully fetched Pending Terms for all Loans" , data : terms}) 
     } catch (error) {
          res.status(500).json({ responseCode : 0 , message : "Error in getching past pending terms"}) 
     }
}


export async function payTerm(req:Request<{},{},{ termId : string}> , res:Response<composite> , next:NextFunction) {
     const { termId } = req.body
     try {
          const updatedTerm = await prisma.term.update({ where : { id : termId} , data : { status : "PAID"}});
          const { loanId } = updatedTerm
          const remainingTerms = await prisma.term.findFirst({ where : { loanId , status : "PENDING"}});
          if(!remainingTerms){
               // Means the last term is also paid , we can update the loan status
               const updatedLoan = await prisma.loan.update({ where : { id : loanId} , data : { status : "PAID"}});
               if(updatedLoan){
                    res.status(200).json({ responseCode : 2 , message : "Loan Has Been Cleared"});
               }else{
                    res.status(200).json({ responseCode : 3 , message : "Something Went Wrong"});
               }
          }else{
               res.status(200).json({ responseCode : 1 , message : "Successfully Paid Term"})
          }
     } catch (error) {
          res.status(500).json({ responseCode : 0 , message : "Error in updating term Payment"})
     }
}