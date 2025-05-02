import express from 'express';
import { criarTag } from '../controllers/tags.js';

const router = express.Router();

router.post("/criarTag", criarTag);


export default router;