"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authenticateUser;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateUser(req, res, next) {
    var authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.sendStatus(401);
        return;
    }
    var token = authHeader.trim().split(" ")[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    try {
        var user = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        if (typeof user === "object") {
            req.user = { email: user.email, id: user.id };
        }
        else {
            throw new Error("Invalid JWT Token");
        }
        next();
    }
    catch (error) {
        var statuscode = void 0, failure = {};
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            statuscode = 401;
            failure["responseCode"] = 2,
                failure["message"] = "Token is expired";
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            statuscode = 403;
            failure["responseCode"] = 3,
                failure["message"] = "Invalid Token";
        }
        else {
            statuscode = 500;
            failure["responseCode"] = 0,
                failure["message"] = "Error with server ".concat(error.message);
        }
        res.status(statuscode).json(failure);
    }
}
