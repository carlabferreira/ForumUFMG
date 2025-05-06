import { db } from "../connect.js";

export const criarCategoria = (req, res) => {

    const nome = req.body.nome;
  
    db.query("SELECT * FROM categorias WHERE nome = ?", [nome], (err, result) => {
        if (err) {
            console.error("Erro ao buscar usuário:", err);
            res.send({ msg: "Erro no servidor" });
            return; 
        }    
  
        if (result.length === 0) {
        
        db.query(
            "INSERT INTO categorias (nome) VALUE (?)",
            [nome],
            (error, response) => {
              if (error) {
                res.send({ msg: "Erro ao criar a categoria" });
                return;
              }
  
              res.send({ msg: "Categoria criada com sucesso" });
            }
          );
      } else {
        res.send({ msg: "Categoria já existe" });
      }
    });
};

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
