import express from 'express';
import { getTopicos, addTopico, deleteTopico, getTopicoById, updateTopico } from '../controllers/topico.js';

const router = express.Router();

router.get("/", getTopicos);
router.post("/", addTopico);
router.delete("/:id", deleteTopico);
router.get("/:id", getTopicoById);
router.put("/:id", updateTopico);

export default router;