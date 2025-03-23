import express from "express";
import { validateNote } from "../middlewares/noteValidation.middleware";
import { authenticateUser } from "../middlewares/authentication.middleware";

import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controllers";


const router = express.Router();
router.get("/", authenticateUser, getNotes);
router.get("/:id", authenticateUser, getNote);
router.post("/", authenticateUser, validateNote, createNote);
router.put("/:id", authenticateUser, validateNote, updateNote);
router.delete("/:id", authenticateUser, deleteNote);


export default router;