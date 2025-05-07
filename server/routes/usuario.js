import express from 'express';
import { getUsuario, updateUsuario } from '../controllers/usuarios.js';

const router = express.Router();

router.get("/find/:usuario_id", getUsuario);
router.put("/", updateUsuario);

export default router;