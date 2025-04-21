import express from 'express';
import { login, cadastro, logout } from '../controllers/auth.js';

const router = express.Router();

router.post("/login", login);
router.post("/cadastro", cadastro);
router.post("/logout", logout);

export default router;