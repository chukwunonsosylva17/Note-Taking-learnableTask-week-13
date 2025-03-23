"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteValidation_middleware_1 = require("../middlewares/noteValidation.middleware");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const note_controllers_1 = require("../controllers/note.controllers");
const router = express_1.default.Router();
router.get("/", authentication_middleware_1.authenticateUser, note_controllers_1.getNotes);
router.get("/:id", authentication_middleware_1.authenticateUser, note_controllers_1.getNote);
router.post("/", authentication_middleware_1.authenticateUser, noteValidation_middleware_1.validateNote, note_controllers_1.createNote);
router.put("/:id", authentication_middleware_1.authenticateUser, noteValidation_middleware_1.validateNote, note_controllers_1.updateNote);
router.delete("/:id", authentication_middleware_1.authenticateUser, note_controllers_1.deleteNote);
exports.default = router;
