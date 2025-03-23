import express from 'express';
import { getIndex } from '../controllers/index.controller';
import categoriesRouter from './category.route';
import noteRouter from '../routes/note.route';
import userRouter from './auth.route';
import checkPassword from './auth.route';
import resetPassword from './auth.route';

const router = express.Router();

router.get('/', getIndex);
router.get('/api/categories', categoriesRouter)
router.get("/api/notes", noteRouter);
router.get("/api/user", userRouter);
router.post('/test-password', checkPassword);
router.post('/reset-password', resetPassword);


export default router;