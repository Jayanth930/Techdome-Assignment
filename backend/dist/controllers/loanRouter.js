"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var loanQuery_1 = require("../queries/loanQuery");
var router = express_1.default.Router();
router.post("/", loanQuery_1.askLoan);
exports.default = router;
