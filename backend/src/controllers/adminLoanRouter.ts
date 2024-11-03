import { approveLoans, getAllLoans } from "../adminQueries/loanQuery";
import express from "express";

const router = express.Router()

router.get("/",getAllLoans)

router.put("/approve",approveLoans)

export default router;