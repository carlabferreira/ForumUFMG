import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Post.css";
import homeIcon from "../icons/home.png";
import plusIcon from "../icons/plus.png";
import loupeIcon from "../icons/loupe.png";
import personIcon from "../icons/person.png";

function PostDetails({ user }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/server/topicos/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Erro ao buscar o post:", err));
  }, [id]);

  if (!post) {
    return <p>Carregando...</p>;
  }

  return (
    <section id="container">
      <header className="small-header">
        <img
          id="logo"
          src="/logo/logo_with_speech_bubble_without_background_2.png"
          alt="Fórum UFMG"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
        <nav>
          <ul>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
                <img src={homeIcon} className="icon" />
                Início
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/criar-topico"); }}>
                <img src={plusIcon} className="icon" />
                Novo Tópico
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/busca"); }}>
                <img src={loupeIcon} className="icon" />
                Busca
              </a>
            </li>
            <li>
              {user ? (
                <a href="#" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
                  <img src={personIcon} className="icon" />
                  {user.nome || user.email}
                </a>
              ) : (
                <a href="#" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
                  <img src={personIcon} className="icon" />
                  Entrar
                </a>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <div className="post-details">
        <h2>{post.titulo}</h2>
        <p>{post.descricao}</p>
        <p>
          Categoria: {post.categoria} | Criado por: {post.nome}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="tags">
            <h4>Tags:</h4>
            <ul>
              {post.tags.map((tag, index) => (
                <li key={index} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default PostDetails;