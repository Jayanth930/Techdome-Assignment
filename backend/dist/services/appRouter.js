"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authRouter_1 = __importDefault(require("../controllers/authRouter"));
var loanRouter_1 = __importDefault(require("../controllers/loanRouter"));
var termRouter_1 = __importDefault(require("../controllers/termRouter"));
var validator_1 = __importDefault(require("../services/validator"));
var adminRouter_1 = __importDefault(require("../services/adminRouter"));
var router = express_1.default.Router();
router.use("/auth", authRouter_1.default);
router.use(validator_1.default);
router.use("/loan", loanRouter_1.default);
router.use("/term", termRouter_1.default);
router.use("/admin", adminRouter_1.default);
exports.default = router;
