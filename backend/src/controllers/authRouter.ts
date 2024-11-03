import express from "express";
import { completeProfile, createUser , getUserStatus , validateUser } from "../queries/authQuery";
const router = express.Router();


router.post("/check",getUserStatus)

router.post("/register",createUser)

router.post("/login",validateUser)

router.post("/profile",completeProfile)


export default router;