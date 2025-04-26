import express from 'express';
import { getTopicos, addTopico, deleteTopico } from '../controllers/topico.js';

const router = express.Router();

router.get("/", getTopicos);
router.post("/", addTopico);
router.delete("/:id", deleteTopico);

export default router;