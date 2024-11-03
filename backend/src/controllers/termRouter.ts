import express from "express"
import { getUpcomingTerms , getPastPendingTerms , payTerm } from "../queries/termQuery"

const router = express.Router()

router.get("/pending/upcoming",getUpcomingTerms)

router.get("/pending/past",getPastPendingTerms)

router.post("/payment",payTerm)

export default router;