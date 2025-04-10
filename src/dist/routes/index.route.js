"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_controller_1 = require("../controllers/index.controller");
const category_route_1 = __importDefault(require("./category.route"));
const note_route_1 = __importDefault(require("../routes/note.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const auth_route_2 = __importDefault(require("./auth.route"));
const auth_route_3 = __importDefault(require("./auth.route"));
const router = express_1.default.Router();
router.get('/', index_controller_1.getIndex);
router.get('/api/categories', category_route_1.default);
router.get("/api/notes", note_route_1.default);
router.get("/api/user", auth_route_1.default);
router.post('/test-password', auth_route_2.default);
router.post('/reset-password', auth_route_3.default);
exports.default = router;
