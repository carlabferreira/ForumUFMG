import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../pages/Post";
import "../styles/Home.css";
import homeIcon from "../icons/home.png";
import plusIcon from "../icons/plus.png";
import loupeIcon from "../icons/loupe.png";
import personIcon from "../icons/person.png";

function Home({ user }) {
  const navigate = useNavigate();
  const [topicoRecente, setTopicoRecente] = useState(null);
  const [topicos, setTopicos] = useState([]);

  useEffect(() => {
    // Fetch para obter todos os tópicos
    fetch("/server/topicos")
      .then((res) => res.json())
      .then((data) => {
        setTopicos(data); // Armazena todos os tópicos no estado
      })
      .catch((err) => console.error("Erro ao buscar tópicos:", err));
  }, []);

  useEffect(() => {
    // Fetch para obter o tópico mais recente
    fetch("/server/topicos?limit=1")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setTopicoRecente(data[0]);
        }
      })
      .catch((err) => console.error("Erro ao buscar tópico recente:", err));
  }, []);

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
      <main>
        <div className="sobre-nos">
          <h2>Sobre nós</h2>
          <p>
            O Fórum UFMG é um projeto desenvolvido por quatro alunos do curso de Sistemas de Informação da UFMG.
            O seu objetivo é ser um espaço para tirar dúvidas, ajudar colegas e compartilhar conhecimento sobre a vida acadêmica!
            <p>
              Para entrar em contato, envie um e-mail para <a href="mailto:contato@forum.ufmg.com">contato@forum.ufmg.com</a>
            </p>
          </p>
        </div>
        <div className="sugestoes">
          <h2>Sugestões</h2>
          <p>
            O Fórum UFMG é um projeto em desenvolvimento e estamos abertos a sugestões e feedbacks!
            Caso queira sugerir uma tag ou ideia para aprimoramento do Fórum, por favor entre em contato pelo e-mail <a href="mailto:sugestoes@forum.ufmg.com">sugestoes@forum.ufmg.com</a>
          </p>
        </div>
        <div className="recente">
          <h2>Tópico mais recente</h2>
          {topicoRecente && (
            <div className="topico-recente">
              <h3>{topicoRecente.titulo}</h3>
              <p>{topicoRecente.descricao}</p>
              <p>
                Categoria: {topicoRecente.categoria} | Criado por: {topicoRecente.nome}
              </p>
            </div>
          )}
        </div>
        <div className="todos-topicos">
          <h2>Todos os tópicos</h2>
          {topicos.length > 0 ? (
            topicos.map((topico, index) => (
              <Post
                key={index}
                id={topico.id}
                titulo={topico.titulo}
                descricao={topico.descricao}
                categoria={topico.categoria}
                nome={topico.nome}
                tags={topico.tags}
              />
            ))
          ) : (
            <p>Nenhum tópico encontrado.</p>
          )}
        </div>
      </main>
      <footer>
        <div> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik</a> 
        from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <p>&copy; 2025 Fórum UFMG. Todos os direitos reservados.</p>
      </footer>
    </section>
  );
}

export default Home;
