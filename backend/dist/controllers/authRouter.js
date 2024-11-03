"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authQuery_1 = require("../queries/authQuery");
var router = express_1.default.Router();
router.post("/check", authQuery_1.getUserStatus);
router.post("/register", authQuery_1.createUser);
router.post("/profile", authQuery_1.completeProfile);
router.post("/login", authQuery_1.validateUser);
exports.default = router;
