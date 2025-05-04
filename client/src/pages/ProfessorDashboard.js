import { useNavigate } from "react-router-dom";
import left_arrow from "../icons/left.png";

function ProfessorDashboard({ user, logout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        logout();
        navigate("/");  // Redireciona para a página inicial
    };

    return (
      <div className="container">
        <h1>Bem-vindo, Professor {user.nome || user.email}!</h1>
        <button className="button" onClick={handleLogout}>Logout</button>

        <div className="register-redirect">
          <p>
            <button className="link-cadastro" onClick={() => navigate("/")}>
              <img src={left_arrow} id="arrow" alt="Voltar"/>
              Voltar para a Página Inicial
            </button>
          </p>
        </div>
      </div>
    );
}

export default ProfessorDashboard;
