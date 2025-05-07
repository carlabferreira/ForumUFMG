import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Post from "../pages/Post";

function BuscaRes() {
    const location = useLocation();
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
        <div className="todos-topicos">
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
    );
}

export default BuscaRes;