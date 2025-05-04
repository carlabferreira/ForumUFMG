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
              <a href="#" onClick={(e) => { e.preventDefault(); }}>
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
        <a>Teste para ver onde o texto aparece</a>
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
