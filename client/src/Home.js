import { useNavigate } from "react-router-dom";
import "./Home.css";  // você pode criar este arquivo ou usar o seu App.css mesmo

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
              <a href="#" onClick={(e) => { e.preventDefault(); }}>Início</a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); }}>Novo Tópico</a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); }}>Busca</a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
                Entrar
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <footer>
        <p>&copy; 2025 Fórum UFMG. Todos os direitos reservados.</p>
      </footer>
    </section>
  );
}

export default Home;
