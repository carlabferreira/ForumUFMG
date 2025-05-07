import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import left_arrow from "../icons/left.png";
import "../styles/CreateTopic.css";

function SearchTopic() {
  const [titulo, setTitulo] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [tagsDisponiveis, setTagsDisponiveis] = useState([]);
  const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories
    axios
      .get("http://localhost:3002/server/categorias", { withCredentials: true })
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Erro ao carregar categorias:", err));

    // Fetch tags
    axios
      .get("http://localhost:3002/server/tags", { withCredentials: true })
      .then((res) => setTagsDisponiveis(res.data))
      .catch((err) => console.error("Erro ao carregar tags:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather all form data
    const formData = {
      titulo: titulo || null,
      categoriaId: categoriaId || null,
      tags: tagsSelecionadas.length > 0 ? tagsSelecionadas.map((tag) => tag.value) : null,
    };
    

    // Send the form data to the backend
    const queryParams = new URLSearchParams();

    if (formData.titulo) queryParams.append("titulo", formData.titulo);
    if (formData.categoriaId) queryParams.append("categoriaId", formData.categoriaId);
    if (formData.tags) formData.tags.forEach((tag) => queryParams.append("tags", tag));

    // Navigate to BuscaRes with query parameters
    navigate(`/busca-res?${queryParams.toString()}`);
  };

  return (
    <div className="create-topic-container">
      <h2>Buscar Tópico</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="form-field"
          />
        </div>
        <div className="form-group">
          <label>Categoria</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="form-field"
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Tags</label>
          <Select
            options={tagsDisponiveis.map((tag) => ({
              value: tag.id,
              label: tag.nome,
            }))}
            isMulti
            isSearchable
            value={tagsSelecionadas}
            onChange={setTagsSelecionadas}
            placeholder="Selecione ou busque tags..."
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        {erro && <p className="form-error">{erro}</p>}
        <button type="submit" className="button">
          Buscar
        </button>
      </form>
      <div className="topic-redirect">
        <p>
          <Link className="link-topic" to="/">
            <img src={left_arrow} id="arrow" alt="Voltar" />
            Voltar para a página inicial
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SearchTopic;