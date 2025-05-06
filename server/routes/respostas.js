import express from 'express';
import { getRespostas, addResposta } from '../controllers/resposta.js';

const router = express.Router();

router.get("/", getRespostas);
router.post("/", addResposta);

export default router;