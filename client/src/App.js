import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home"
import AdminDashboard from "./pages/AdminDashboard";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import UserDashboard from "./pages/UserDashboard";
import CriarTag from "./components/CriarTag";
import CriarCategoria from "./components/CriarCategoria";
import CreateTopic from "./pages/CreateTopic";
import Busca from "./pages/Busca";
import PostDetails from "./pages/PostDetails";
import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const renderDashboard = () => {
    if (!user) return <Login setUser={setUser} />;
    if (user.tipo === "Técnico-Administrativo") {
      return <AdminDashboard user={user} logout={logout} />;
    } else if (user.tipo === "Professor") {
      return <ProfessorDashboard user={user} logout={logout} />;
    } else {
      return <UserDashboard user={user} logout={logout} />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={renderDashboard()} />
        <Route path="/criar-tag" element={<CriarTag />} />
        <Route path="/criar-topico" element={<CreateTopic />} />
        <Route path="/criar-categoria" element={<CriarCategoria />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
