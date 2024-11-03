import express from "express";
import authRouter from "../controllers/authRouter"
import loanRouter from "../controllers/loanRouter"
import termRouter from "../controllers/termRouter"
import authenticateUser from "../services/validator"
import adminRouter from "../services/adminRouter"
const router = express.Router();


router.use("/auth",authRouter)

router.use(authenticateUser)

router.use("/loan",loanRouter)

router.use("/term",termRouter)

router.use("/admin",adminRouter)

export default router;
