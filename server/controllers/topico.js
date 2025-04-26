import moment from "moment/moment.js";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getTopicos = (req, res) => {

    const q = `SELECT t.*, u.id AS usuario_id, u.nome, u.tipo, c.id AS categoria_id, c.nome AS categoria
                FROM topicos AS t JOIN usuarios AS u ON (u.id = t.usuario_id)
                JOIN categorias c ON t.categoria_id = c.id
                ORDER BY t.criado_em DESC`;

    db.query(q, async (err, topicos) => {
        if (err) return res.status(500).json(err);

        // Buscar as tags de todos os topicos
        const topico_ids = topicos.map((topico) => topico.id);
        if (topico_ids.length === 0) return res.json([]); // Nenhum topico

        const q = `
            SELECT tt.topico_id, t.nome
            FROM topico_tags tt
            JOIN tags t ON tt.tag_id = t.id
            WHERE tt.topico_id IN (?)`;

        db.query(q, [topico_ids], (err, tags) => {
            if (err) return res.status(500).json(err);

            const tagsPorTopico = {};
            tags.forEach((tag) => {
                if (!tagsPorTopico[tag.topico_id]) tagsPorTopico[tag.topico_id] = [];
                tagsPorTopico[tag.topico_id].push(tag.nome);
            });

            const topicosComTags = topicos.map((topico) => ({
                ...topico,
                tags: tagsPorTopico[topico.id] || []
            }));

            return res.json(topicosComTags);
        });
    });
};

export const addTopico = (req, res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Não logado!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token não é válido!");

        const { titulo, descricao, categoria_id, imagem, tags } = req.body;

        const valores = [
            titulo,
            descricao,
            categoria_id,
            imagem,
            userInfo.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ];

        const q = `INSERT INTO topicos (titulo, descricao, categoria_id, imagem, usuario_id, criado_em) VALUES (?)`;

        db.query(q, [valores], (err, data) => {
            if (err) return res.status(500).json(err);

            const topico_id = data.insertId;

            // Se não houver tags, apenas retorna sucesso
            if (!tags || !Array.isArray(tags) || tags.length === 0) {
                return res.status(200).json("Tópico criado com sucesso!");
            }

            // Verifica tags e insere relação
            const tagPromises = tags.map((tag) => {
                return new Promise((resolve, reject) => {
                    // 1. Verifica se tag já existe
                    db.query("SELECT id FROM tags WHERE nome = ?", [tag], (err, tagRows) => {
                        if (err) return reject(err);

                        if (tagRows.length > 0) {
                            // Tag já existe
                            const tagId = tagRows[0].id;
                            return resolve(tagId);
                        } else {
                            return res.status(404).json("Tag não existente!");
                        }
                    });
                });
            });

            Promise.all(tagPromises)
            .then((tagIds) => {
                const relacoes = tagIds.map((tagId) => [topico_id, tagId]);
                const q = "INSERT INTO topico_tags (topico_id, tag_id) VALUES ?";

                db.query(q, [relacoes], (err) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("Tópico criado com sucesso!");
                });
            })
            .catch((err) => {
                return res.status(500).json(err);
            });
        });
    });
};

export const deleteTopico = (req, res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Não logado!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token não é válido!");

        const q = "DELETE FROM topicos WHERE `id` = ? AND `usuario_id` = ?";

        db.query(q, [req.params.id, userInfo.id], (err, data)=>{
            if (err) return res.status(500).json(err);
            if(data.affectedRows > 0) return res.status(200).json("Tópico deletado com sucesso!");
            return res.status(403).json("Você não tem a propriedade desse tópico para deletá-lo.");
        });

    });
};