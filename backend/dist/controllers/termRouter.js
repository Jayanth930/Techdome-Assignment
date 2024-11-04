"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var termQuery_1 = require("../queries/termQuery");
var router = express_1.default.Router();
router.get("/pending/upcoming", termQuery_1.getUpcomingTerms);
router.get("/pending/past", termQuery_1.getPastPendingTerms);
router.post("/payment", termQuery_1.payTerm);
exports.default = router;
