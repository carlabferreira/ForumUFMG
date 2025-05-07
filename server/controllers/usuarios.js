import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUsuario = (req, res) => {
    const usuario_id = req.params.usuario_id;
    const q = "SELECT * FROM usuarios WHERE id = ?";

    db.query(q, [usuario_id], (err, data) => {
        if(err) return res.status(500).json(err);
        const { senha, ...info } = data[0];
        return res.json(info);
    });
};

export const updateUsuario = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Não logado!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token não é válido!");
    
        const q = "UPDATE usuarios SET `email` = ?, `nome` = ? WHERE id = ?";

        const valores = [req.body.email, req.body.nome, userInfo.id];

        db.query(q, valores, (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Usuário atualizado!");
            return res.status(403).json("Você só pode atualizar o seu usuário!");
        })
    });
};