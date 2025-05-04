import { useNavigate } from "react-router-dom";
import left_arrow from "../icons/left.png";

function UserDashboard({ user, logout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        logout();
        navigate("/");
    };

    return (
      <div className="container">
        <h1>Bem-vindo, {user.nome || user.email}!</h1>
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

export default UserDashboard;
