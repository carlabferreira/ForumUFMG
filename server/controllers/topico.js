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

            const relacoes = tags.map((tagId) => [topico_id, tagId]);
            const insertRelacoes = "INSERT INTO topico_tags (topico_id, tag_id) VALUES ?";

            db.query(insertRelacoes, [relacoes], (err2) => {
                if (err2) return res.status(500).json(err2);
                return res.status(200).json("Tópico criado com sucesso!");
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

export const getTopicoById = (req, res) => {
    const { id } = req.params;
  
    const q = `SELECT t.*, u.nome AS nome, c.nome AS categoria
               FROM topicos AS t
               JOIN usuarios AS u ON t.usuario_id = u.id
               JOIN categorias AS c ON t.categoria_id = c.id
               WHERE t.id = ?`;
  
    db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Post não encontrado");
  
      const post = data[0];
  
      // Buscar as tags do post
      const qTags = `SELECT t.nome FROM topico_tags tt
                     JOIN tags t ON tt.tag_id = t.id
                     WHERE tt.topico_id = ?`;
  
      db.query(qTags, [id], (err, tags) => {
        if (err) return res.status(500).json(err);
  
        post.tags = tags.map((tag) => tag.nome);
        return res.json(post);
      });
    });
};

export const updateTopico = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Não logado!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token não é válido!");
    
        const q = "UPDATE topicos SET `titulo` = ?, `descricao` = ?, `imagem` = ? WHERE `id` = ? AND `usuario_id` = ?";

        const valores = [req.body.titulo, req.body.descricao, req.body.imagem, req.params.id, userInfo.id];

        db.query(q, valores, (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Tópico atualizado!");
            return res.status(403).json("Você só pode atualizar tópico criado por você!");
        })
    });
};

export const getTopicoBySearch = (req, res) => {
    //console.log("Query Parameters:", req.query);
    const { tags, categoriaId, titulo } = req.query; // Extract query parameters

    // Ensure at least one parameter is provided
    if (!tags && !categoriaId && !titulo) {
        return res.status(400).json("Pelo menos um parâmetro de busca deve ser fornecido.");
    }

    // Base query
    let q = `
        SELECT DISTINCT t.*, u.nome AS usuario_nome, c.nome AS categoria_nome
        FROM topicos AS t
        JOIN usuarios AS u ON t.usuario_id = u.id
        JOIN categorias AS c ON t.categoria_id = c.id
        LEFT JOIN topico_tags tt ON t.id = tt.topico_id
        LEFT JOIN tags tg ON tt.tag_id = tg.id
        WHERE 1=1
    `;

    // Query conditions
    const conditions = [];
    const values = [];

    if (tags) {
        const tagArray = Array.isArray(tags) ? tags : [tags]; // Ensure tags is an array
        conditions.push(`tg.id IN (${tagArray.map(() => "?").join(",")})`);
        values.push(...tagArray);
    }

    if (categoriaId) {
        conditions.push("c.id = ?");
        values.push(categoriaId);
    }

    if (titulo) {
        conditions.push("t.titulo LIKE ?");
        values.push(`%${titulo}%`);
    }

    // Append conditions to the query
    if (conditions.length > 0) {
        q += " AND " + conditions.join(" AND ");
    }

    // Order by creation date
    q += " ORDER BY t.criado_em DESC";
    //console.log(q);

    // Execute the query
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);

        // If no topics are found
        if (data.length === 0) return res.status(404).json("Nenhum tópico encontrado.");

        // Fetch tags for the found topics
        const topicoIds = data.map((topico) => topico.id);
        //console.log("Topic IDs:", topicoIds);

        const qTags = `
            SELECT tt.topico_id, tg.nome
            FROM topico_tags tt
            JOIN tags tg ON tt.tag_id = tg.id
            WHERE tt.topico_id IN (?)
        `;

        db.query(qTags, [topicoIds], (err, tags) => {
            if (err) return res.status(500).json(err);

            // Group tags by topic ID
            const tagsPorTopico = {};
            tags.forEach((tag) => {
                if (!tagsPorTopico[tag.topico_id]) tagsPorTopico[tag.topico_id] = [];
                tagsPorTopico[tag.topico_id].push(tag.nome);
            });

            // Add tags to topics
            const topicosComTags = data.map((topico) => ({
                ...topico,
                tags: tagsPorTopico[topico.id] || [],
            }));

            return res.json(topicosComTags);
        });
    });
};