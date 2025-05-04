import { useNavigate } from "react-router-dom";

function AdminDashboard({ user, logout }) {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Bem-vindo, Técnico {user.nome || user.email}!</h1>
      <button className="button" onClick={logout}>Logout</button>
      <button className="button" onClick={() => navigate("/criar-tag")}>Criar Tag</button>
    </div>
  );
}

export default AdminDashboard;
