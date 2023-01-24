import express from "express";
import { getProdutos, addProduto, updateProduto, deleteProduto, getProdutosPorId } from "../controllers/produtos.js";


const router = express.Router();

router.get("/get", getProdutos);
router.get("/get/:id_produto", getProdutosPorId);
router.post("/criar", addProduto);
router.put("/editar/:id_produto", updateProduto);
router.delete("/deletar/:id_produto", deleteProduto);

export default router;