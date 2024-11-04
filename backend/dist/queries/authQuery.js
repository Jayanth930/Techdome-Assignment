"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStatus = getUserStatus;
exports.createUser = createUser;
exports.completeProfile = completeProfile;
exports.validateUser = validateUser;
var client_1 = require("@prisma/client");
var utils_1 = require("../utils");
var bcrypt_1 = __importDefault(require("bcrypt"));
var prisma = new client_1.PrismaClient();
// checking user status in registration process
function getUserStatus(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var email, user, status_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma.user.findUnique({ where: { email: email } })];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        res.status(200).json({ responseCode: 1, message: "User not found redirect to Register page" });
                    }
                    else {
                        status_1 = user.status;
                        if (status_1 === "ACTIVE") {
                            // profile completed , so redirect to Login Page.
                            res.status(200).json({ responseCode: 2, message: "User found redirect to login page" });
                        }
                        else {
                            // only registered , profile not completed , so redirect to Profile Page
                            res.status(200).json({ responseCode: 3, message: "User found redirect to Profile Page" });
                        }
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    res.status(500).json({ responseCode: 0, message: "Error in fetching user status" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// creating a user
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, hash, user, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, utils_1.gethashedPassword)(password)];
                case 2:
                    hash = _b.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                email: email,
                                password: hash
                            }
                        })];
                case 3:
                    user = _b.sent();
                    res.status(201).json({ responseCode: 1, message: "Successfully created user", data: user });
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    res.status(500).json({ responseCode: 0, message: "Failed to create user" });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// complete the profile of the user
function completeProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, firstName, lastName, phoneNo, email, data, user, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, phoneNo = _a.phoneNo;
                    email = req.query.email;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    data = void 0;
                    if (lastName) {
                        data = __assign({}, req.body);
                    }
                    else {
                        data = { firstName: firstName, phoneNo: phoneNo };
                    }
                    return [4 /*yield*/, prisma.user.update({
                            where: { email: email },
                            data: __assign(__assign({}, data), { status: "ACTIVE" })
                        })];
                case 2:
                    user = _b.sent();
                    if (!user)
                        res.status(200).json({ responseCode: 2, message: "Email Not Found" });
                    else
                        res.status(200).json({ responseCode: 1, message: "Successfully updated the user , redirect to Login Page" });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    res.status(500).json({ responseCode: 0, message: "Error in updating user" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Validate User 
function validateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, user, hash, status_2, id, isValid, accessToken, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, prisma.user.findUnique({ where: { email: email } })];
                case 1:
                    user = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    hash = user.password, status_2 = user.status, id = user.id;
                    return [4 /*yield*/, bcrypt_1.default.compare(password, hash)];
                case 3:
                    isValid = _b.sent();
                    if (isValid) {
                        accessToken = (0, utils_1.generateAccesstoken)({ email: email, id: id });
                        if (status_2 === client_1.UserStatus.VERIFIED) {
                            res.status(200).json({ responseCode: 2, message: "Redirect to profile page", data: accessToken });
                        }
                        else {
                            // profile is also completed , redirect to home page
                            res.status(200).json({ responseCode: 1, message: "Redirect to Home page", data: accessToken });
                        }
                    }
                    else {
                        res.status(200).json({ responseCode: 3, message: "Incorrect Passoword" });
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _b.sent();
                    res.status(500).json({ responseCode: 0, message: "Error in validating user : " + error_4.message });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
