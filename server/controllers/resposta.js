import moment from "moment/moment.js";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRespostas = (req, res) => {

    const q = `SELECT r.*, u.id AS usuario_id, nome, tipo FROM respostas AS r JOIN usuarios AS u ON (u.id = r.usuario_id)
    WHERE r.topico_id = ? ORDER BY r.criada_em DESC`;

    db.query(q, [req.query.topico_id], (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addResposta = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Não logado!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token não é válido!");

        const q = "INSERT INTO respostas (`topico_id`, `usuario_id`, `conteudo`, `criada_em`) VALUES (?)";

        const valores = [
            req.body.topico_id,
            userInfo.id,
            req.body.conteudo,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]

        db.query(q, [valores], (err, data)=>{
            if (err) return res.status(500).json(err);
            return res.status(200).json("Resposta enviada com sucesso!");
        });

    });
};

export const deleteResposta = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Não autenticado!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token não é válido!");
  
      const respostaId = req.params.id;
      const q = "DELETE FROM respostas WHERE `id` = ? AND `usuario_id` = ?";
  
      db.query(q, [respostaId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Resposta foi deletada!");
        return res.status(403).json("Você apenas pode apagar suas respostas!");
      });
    });
  };