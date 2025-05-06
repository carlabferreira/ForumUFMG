import React from "react";
import "../styles/Post.css";

function Post({titulo, descricao, categoria, nome, tags}) {
    return(
        <div className="post">
            <h3>{titulo}</h3>
            <p>{descricao}</p>
            <p>Categoria: {categoria} | Criado por: {nome}</p>
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
        </div>
    );
}

export default Post;