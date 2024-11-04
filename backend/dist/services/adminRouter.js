"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var adminLoanRouter_1 = __importDefault(require("../controllers/adminLoanRouter"));
var router = express_1.default.Router();
router.use("/loan", adminLoanRouter_1.default);
exports.default = router;
