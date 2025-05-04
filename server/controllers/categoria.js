import { db } from "../connect.js";

export const getCategorias = (req, res) => {
    const q = "SELECT * FROM categorias";
    
    db.query(q, (err, data) => {
        if (err) {
            console.error("Erro ao buscar categorias:", err); // Exibe o erro no log
            return res.status(500).json(err); // Retorna o erro com status 500
        }
        return res.json(data);
    });
};
