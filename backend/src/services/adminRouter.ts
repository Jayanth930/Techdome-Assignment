import express from "express";
import adminLoanRouter from "../controllers/adminLoanRouter"

const router = express.Router()

router.use("/loan",adminLoanRouter)

export default router;