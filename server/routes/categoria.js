import express from "express";
import { criarCategoria, getCategorias } from "../controllers/categoria.js";

const router = express.Router();

router.post("/criarCategoria", criarCategoria);
router.get("/", getCategorias);

export default router;
