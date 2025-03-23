"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = void 0;
const getIndex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalCategories = 0;
        const totalNotes = 0;
        const totalUsers = 0;
        res.json({
            name: "Notes API",
            version: process.env.npm_package_version || "1.0.0",
            status: "operational",
            documentation: "/api-docs",
            endpoints: {},
            users: {
                path: "/api/users",
                methods: ["GET", "POST"]
            },
            categories: {
                path: "/api/categories",
                methods: ["GET", "POST"]
            },
            notes: {
                path: "/api/notes",
                methods: ["GET", "POST"]
            },
            statistics: {
                totalNotes,
                totalCategories,
                totalUsers
            },
            timestamps: {
                server: new Date(),
                database: 'getDatabaseTimeStamp'
            }
        });
    }
    catch (error) {
        res.status(503).json({
            name: "Notes API",
            status: "maintenance",
            message: "Service temporarily unavailable"
        });
    }
});
exports.getIndex = getIndex;
