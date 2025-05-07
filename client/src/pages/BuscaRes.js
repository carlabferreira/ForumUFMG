import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../pages/Post";
import homeIcon from "../icons/home.png";
import plusIcon from "../icons/plus.png";
import loupeIcon from "../icons/loupe.png";
import personIcon from "../icons/person.png";
import "../styles/BuscaRes.css";

function BuscaRes({ user }) {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search); // Parse query parameters
    const [topicos, setTopicos] = useState([]);
    const [erro, setErro] = useState("");

    useEffect(() => {
        // Fetch topics with search parameters
        fetch(`/server/topicos/search?${searchParams.toString()}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Erro ao buscar tópicos.");
                }
                return res.json();
            })
            .then((data) => {
                setTopicos(data);
                setErro("");
            })
            .catch((err) => {
                console.error("Erro ao buscar tópicos:", err);
                setErro("Erro ao buscar tópicos. Tente novamente mais tarde.");
            });
    }, [searchParams]);

    return (
        <section id="container">
            <header className="small-header">
                <img
                    id="logo"
                    src="/logo/logo_with_speech_bubble_without_background_2.png"
                    alt="Fórum UFMG"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                />
                <nav>
                    <ul>
                        <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
                                <img src={homeIcon} className="icon" />
                                Início
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/criar-topico"); }}>
                                <img src={plusIcon} className="icon" />
                                Novo Tópico
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/busca"); }}>
                                <img src={loupeIcon} className="icon" />
                                Busca
                            </a>
                        </li>
                        <li>
                            {user ? (
                                <a href="#" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
                                    <img src={personIcon} className="icon" />
                                    {user.nome || user.email}
                                </a>
                            ) : (
                                <a href="#" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
                                    <img src={personIcon} className="icon" />
                                    Entrar
                                </a>
                            )}
                        </li>
                    </ul>
                </nav>
            </header>
            <section className="busca-container">
                <div className="todos-topicos-busca">
                    <h2>Resultados da Busca</h2>
                    {erro && <p className="error-message">{erro}</p>}
                    {topicos.length > 0 ? (
                        topicos.map((topico, index) => (
                            <Post
                                key={index}
                                id={topico.id}
                                titulo={topico.titulo}
                                descricao={topico.descricao}
                                categoria={topico.categoria_nome}
                                nome={topico.usuario_nome}
                                tags={topico.tags}
                                criado_em={topico.criado_em}
                            />
                        ))
                    ) : (
                        !erro && <p>Nenhum tópico encontrado.</p>
                    )}
                </div>
            </section>
             {/* Rodapé do site */}
            <footer>
                <div> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a> 
                from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                <p>&copy; 2025 Fórum UFMG. Todos os direitos reservados.</p>
            </footer>
        </section>
    );
}

export default BuscaRes;