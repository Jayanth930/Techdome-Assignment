import express from "express";
import { askLoan , getLoans } from "../queries/loanQuery";
const router = express.Router()

router.post("/",askLoan)

router.get("/",getLoans)

export default router;