import express from 'express';
import { criarTag, getTags} from '../controllers/tags.js';

const router = express.Router();

router.post("/criarTag", criarTag);
router.get("/", getTags);

export default router;