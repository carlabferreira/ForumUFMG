import express from 'express';
import { getRespostas, addResposta, deleteResposta } from '../controllers/resposta.js';

const router = express.Router();

router.get("/", getRespostas);
router.post("/", addResposta);
router.delete("/:id", deleteResposta);

export default router;