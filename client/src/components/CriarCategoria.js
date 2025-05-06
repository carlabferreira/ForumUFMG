import { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Apenas useNavigate, nada de Router
import Axios from "axios";

function CriarCategoria() {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  const handleCategoryCreation = () => {
    Axios.post("http://localhost:3002/server/categorias/criarCategoria", {
      nome: categoryName,
    }).then((response) => {
      alert(response.data.msg);
      navigate("/");  // Volta para a dashboard depois
    });
  };

  return (
    <div className="container">
      <h1>Criar Categoria</h1>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Nome da Categoria"
        className="form-field"
      />
      <button className="button" onClick={handleCategoryCreation}>Criar</button>
    </div>
  );
}

export default CriarCategoria;
