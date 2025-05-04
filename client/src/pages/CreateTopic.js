import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateTopic.css";

function CreateTopic() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [imagem, setImagem] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [tagsDisponiveis, setTagsDisponiveis] = useState([]);
  const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Buscar categorias
    axios.get("/server/categorias")
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Erro ao carregar categorias:", err));

    // Buscar tags
    axios.get("/server/tags")
      .then((res) => setTagsDisponiveis(res.data))
      .catch((err) => console.error("Erro ao carregar tags:", err));
  }, []);

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
          tags: tagsSelecionadas,
        },
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      console.error(err);
      setErro(err.response?.data || "Erro ao criar tópico.");
    }
  };

  const toggleTag = (tagId) => {
    setTagsSelecionadas((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div className="create-topic-container">
      <h2>Criar Novo Tópico</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Título *</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="form-field"
          />
        </div>
        <div className="form-group">
          <label>Descrição *</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            rows={5}
            className="form-field"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Categoria *</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
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
          <label>Imagem (URL)</label>
          <input
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="Opcional"
            className="form-field"
          />
        </div>
        <div className="form-group">
          <label>Tags</label>
          <div className="tags-list">
            {tagsDisponiveis.map((tag) => (
              <label key={tag.id} className="tag-checkbox">
                <input
                  type="checkbox"
                  value={tag.id}
                  checked={tagsSelecionadas.includes(tag.id)}
                  onChange={() => toggleTag(tag.id)}
                />
                {tag.nome}
              </label>
            ))}
          </div>
        </div>
        {erro && <p className="form-error">{erro}</p>}
        <button type="submit" className="button">
          Criar Tópico
        </button>
      </form>
    </div>
  );
}

export default CreateTopic;
