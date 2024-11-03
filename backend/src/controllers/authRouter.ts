import express from "express";
import { completeProfile, createUser , getUserStatus , validateUser } from "../queries/authQuery";
const router = express.Router();


router.post("/check",getUserStatus)

router.post("/register",createUser)

router.post("/profile",completeProfile)

router.post("/login",validateUser)


export default router;