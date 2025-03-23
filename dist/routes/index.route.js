"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_controller_1 = require("../controllers/index.controller");
const category_route_1 = __importDefault(require("./category.route"));
const note_route_1 = __importDefault(require("../routes/note.route"));
const user_route_1 = __importDefault(require("../routes/user.route"));
const router = express_1.default.Router();
router.get('/', index_controller_1.getIndex);
router.get('/api/categories', category_route_1.default);
router.get("/api/notes", note_route_1.default);
router.get("api/user", user_route_1.default);
exports.default = router;
