import express from 'express';
import { getTopicos, addTopico } from '../controllers/topico.js';

const router = express.Router();

router.get("/", getTopicos);
router.post("/", addTopico);

export default router;