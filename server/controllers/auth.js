import { db } from "../connect.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const saltRounds = 10;

export const cadastro = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
      if (err) {
        console.error("Erro ao buscar usuário:", err);
        res.send({ msg: "Erro no servidor" });
        return; 
      }    
  
      if (result.length === 0) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            res.send({ msg: "Erro ao criptografar a senha" });
            return;
          }
  
          db.query(
            "INSERT INTO usuarios (email, password) VALUE (?,?)",
            [email, hash],
            (error, response) => {
              if (error) {
                res.send({ msg: "Erro ao cadastrar o usuário" });
                return;
              }
  
              res.send({ msg: "Usuário cadastrado com sucesso" });
            }
          );
        });
      } else {
        res.send({ msg: "Email já cadastrado" });
      }
    });
};

export const login = (req, res) => {

    const q = "SELECT * FROM usuarios WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if(data.length === 0 ) return res.status(404).json("Usuário não encontrado.");

        const verificaSenha = bcrypt.compareSync(req.body.password, data[0].password);

        if(!verificaSenha) return res.status(400).json("Usuário ou senha errados.");

        const token = jwt.sign({id:data[0].id}, "secretkey");

        const{password, ...others} = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
    });
};

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure:true,
        sameSite:"none"
    }).status(200).json("Usuário foi deslogado.");
};
