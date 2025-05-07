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
  const [respostas, setRespostas] = useState([]);
  const [novaResposta, setNovaResposta] = useState("");

  useEffect(() => {
    // Buscar o post
    fetch(`/server/topicos/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Erro ao buscar o post:", err));

    // Buscar respostas do post
    fetch(`/server/respostas?topico_id=${id}`)
      .then((res) => res.json())
      .then((data) => setRespostas(data))
      .catch((err) => console.error("Erro ao buscar respostas:", err));
  }, [id]);

  // Função para deletar uma resposta
  const handleDelete = async () => {
    try {
      const response = await fetch(`/server/topicos/${id}`, {
        method: "DELETE",
        credentials: "include", // Inclui cookies para autenticação
      });

      if (response.ok) {
        alert("Tópico deletado com sucesso!");
        navigate("/"); // Redireciona para a página inicial após a exclusão
      } else {
        const errorMessage = await response.text();
        alert(`Erro ao deletar o tópico: ${errorMessage}`);
      }
    } catch (err) {
      console.error("Erro ao deletar o tópico:", err);
      alert("Erro ao deletar o tópico.");
    }
  };

  // Função para enviar uma nova resposta
  const handleRespostaSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/server/respostas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Inclui cookies para autenticação
        body: JSON.stringify({
          topico_id: id,
          conteudo: novaResposta,
        }),
      });

      if (response.ok) {
        const novaRespostaData = await response.json();
        setRespostas([novaRespostaData, ...respostas]); // Atualiza a lista de respostas
        setNovaResposta(""); // Limpa o campo de texto
      } else {
        const errorMessage = await response.text();
        alert(`Erro ao enviar resposta: ${errorMessage}`);
      }
    } catch (err) {
      console.error("Erro ao enviar resposta:", err);
      alert("Erro ao enviar resposta.");
    }
  };

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

      {/* Conteúdo principal da página do post */}
      <div className="post-container">
        <h2>{post.titulo}</h2>
        <p className="descricao-post">{post.descricao}</p>
        <p className="user-info-post">
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
        {/* Botão de deletar visível apenas para o criador do post */}
        {user && user.nome === post.nome && (
          <button className="delete-button" onClick={handleDelete}>
            Deletar Tópico
          </button>
        )}
        {/* Formulário para responder */}
        <form onSubmit={handleRespostaSubmit} className="resposta-form">
          <h4 className="titulo-resposta">Responder:</h4>
          <textarea
            value={novaResposta}
            onChange={(e) => setNovaResposta(e.target.value)}
            placeholder="Escreva sua resposta aqui..."
            required
          />
          <button type="submit">Enviar Resposta</button>
        </form>
        {/* Lista de respostas */}
        <div className="lista-respostas">
          <h4>Respostas:</h4>
          {respostas.length > 0 ? (
            respostas.map((resposta) => {
              const dataCriacao = new Date(resposta.criada_em); // Converte para objeto Date
              const dataFormatada = !isNaN(dataCriacao) // Verifica se a data é válida
              ? dataCriacao.toLocaleString() // Formata a data para o formato local
              : "Data inválida"; // Mensagem de fallback para datas inválidas
              return (
              <div key={resposta.id} className="resposta">
                {/*<p>
                  Respondido por: {resposta.nome} em {dataFormatada}
                </p>*/}
                  <span className="user-info-resposta">Respondido por: {resposta.nome}</span>
                <p className="reposta-conteudo">{resposta.conteudo}</p>
              </div>
              );
            })
          ) : (
            <p className="texto-sem-resposta">Seja o primeiro a responder!</p>
          )}
          </div>
        </div>
    </section>
  );
}

export default PostDetails;