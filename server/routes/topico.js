import express from 'express';
import { getTopicos, addTopico, deleteTopico, getTopicoById } from '../controllers/topico.js';

const router = express.Router();

router.get("/", getTopicos);
router.post("/", addTopico);
router.delete("/:id", deleteTopico);
router.get("/:id", getTopicoById);

export default router;