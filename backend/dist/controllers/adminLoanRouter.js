"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var loanQuery_1 = require("../adminQueries/loanQuery");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/", loanQuery_1.getAllLoans);
router.put("/approve", loanQuery_1.approveLoans);
exports.default = router;
