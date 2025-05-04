import { db } from "../connect.js";

export const criarTag = (req, res) => {

    const nome = req.body.nome;
  
    db.query("SELECT * FROM tags WHERE nome = ?", [nome], (err, result) => {
        if (err) {
            console.error("Erro ao buscar usuário:", err);
            res.send({ msg: "Erro no servidor" });
            return; 
        }    
  
        if (result.length === 0) {
        
        db.query(
            "INSERT INTO tags (nome) VALUE (?)",
            [nome],
            (error, response) => {
              if (error) {
                res.send({ msg: "Erro ao criar a tag" });
                return;
              }
  
              res.send({ msg: "Tag criada com sucesso" });
            }
          );
      } else {
        res.send({ msg: "Tag já existe" });
      }
    });
};

export const getTags = (req, res) => {
  const q = "SELECT * FROM tags";
  db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
  });
};
