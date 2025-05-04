import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import homeIcon from "../icons/home.png";
import plusIcon from "../icons/plus.png";
import loupeIcon from "../icons/loupe.png";
import personIcon from "../icons/person.png";

function Home() {
  const navigate = useNavigate();

  return (
    <section id="container">
      <header>
        <img
          id="logo"
          src="/logo/logo_with_speech_bubble_without_background_2.png"
          alt="Fórum UFMG"
        />
        <nav>
          <ul>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); }}>
                <img src={homeIcon} class="icon" />
                Início </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/criar-topico"); }}>
                <img src={plusIcon} class="icon" />  
                Novo Tópico</a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); }}>
                <img src={loupeIcon} class="icon" />
                Busca</a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
                <img src={personIcon} class="icon" />
                Entrar
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <p>Teste para ver onde o texto aparece</p>
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
