import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from 'react-select';
import left_arrow from "../icons/left.png";
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
  const [mensagemSucesso, setMensagemSucesso] = useState("");


  useEffect(() => {

    // Buscar categorias
    axios.get("http://localhost:3002/server/categorias", { withCredentials: true })
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Erro ao carregar categorias:", err));

    // Buscar tags
    axios.get("http://localhost:3002/server/tags", { withCredentials: true })
      .then((res) => setTagsDisponiveis(res.data))
      .catch((err) => console.error("Erro ao carregar tags:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            "http://localhost:3002/server/topicos",
            {
                titulo,
                descricao,
                categoria_id: categoriaId,
                imagem,
                tags: tagsSelecionadas.map(tag => tag.value),
            }, 
            {withCredentials: true}
        );
        console.log(response.data);
        setMensagemSucesso("Tópico criado com sucesso!");
        setTimeout(() => {
          setMensagemSucesso("");
          navigate("/home");
        }, 3000);
    } catch (err) {
      console.error("Erro real:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        setErro("Você precisa estar logado.");
      } else {
        setErro("Erro ao criar o tópico.");
      }
    }
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
          <Select
            options={tagsDisponiveis.map(tag => ({
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
        {erro && <p className="form-error">{typeof erro === "object" ? JSON.stringify(erro) : erro}</p>}
        <button type="submit" className="button">
          Criar Tópico
        </button>
      </form>
      {mensagemSucesso && <div className="mensagem-sucesso">{mensagemSucesso}</div>}
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

export default CreateTopic;
