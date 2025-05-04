// src/pages/CreateTopic.js

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTopic() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [tags, setTags] = useState("");
  const [imagem, setImagem] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  // Buscar categorias do backend quando o componente for montado
  useEffect(() => {
    axios.get("/server/categorias")
    .then((res) => {
      console.log("Categorias recebidas:", res.data);
      setCategorias(res.data);
    })
    .catch((err) => console.error("Erro ao carregar categorias:", err));
}, []);

  // Função para criar o tópico
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!titulo || !descricao || !categoriaId) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await axios.post(
        "/server/topicos",
        {
          titulo,
          descricao,
          categoria_id: categoriaId,
          imagem,
          tags: tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""),
        },
        { withCredentials: true }
      );
      navigate("/"); // Redireciona para a home ou lista de tópicos
    } catch (err) {
      console.error(err);
      setErro(err.response?.data || "Erro ao criar tópico.");
    }
  };

  return (
    <div className="create-topic-container" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Criar Novo Tópico</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Título *</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Descrição *</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            rows={5}
            style={{ width: "100%", padding: "8px" }}
          ></textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Categoria *</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Imagem (URL)</label>
          <input
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="Opcional"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Tags (separadas por vírgula)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="ex: programação, dúvida"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Criar Tópico
        </button>
      </form>
    </div>
  );
}

export default CreateTopic;
