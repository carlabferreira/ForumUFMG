import React from "react";
import { Link } from "react-router-dom"; // Importação do Link
import "../styles/Post.css";
import moment from "moment";
import "moment/locale/pt-br";

function Post({ id, titulo, descricao, categoria, criado_em, nome, tags }) {

  moment.locale("pt-br");
  const timeAgo = criado_em ? moment(criado_em).local().fromNow() : "Data inválida";

  return (
    <div className="post">
      <h3>{titulo}</h3>
      <p>{descricao}</p>
      <p className="categoria">Categoria: {categoria} | Criado por: {nome} </p>
      {tags && tags.length > 0 && (
        <div className="tags">
          <h4>Tags:</h4>
          <ul>
            {tags.map((tag, index) => (
              <li key={index} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
      <span className="date">Criado {timeAgo}</span>
      <br></br>
      <Link to={`/post/${id}`} className="link-ver-mais">
        Ver mais
      </Link>
    </div>
  );
}

export default Post;