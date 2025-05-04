import { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Apenas useNavigate, nada de Router
import Axios from "axios";
import "./App.css";

function CriarTag() {
  const [tagName, setTagName] = useState("");
  const navigate = useNavigate();

  const handleTagCreation = () => {
    Axios.post("http://localhost:3002/server/tags/criarTag", {
      nome: tagName,
    }).then((response) => {
      alert(response.data.msg);
      navigate("/");  // Volta para a dashboard depois
    });
  };

  return (
    <div className="container">
      <h1>Criar Tag</h1>
      <input
        type="text"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        placeholder="Nome da Tag"
        className="form-field"
      />
      <button className="button" onClick={handleTagCreation}>Criar</button>
    </div>
  );
}

export default CriarTag;
