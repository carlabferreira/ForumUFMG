import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/App";

const root = ReactDOM.createRoot(document.getElementById("root"));

function changeContent(page){
  var contentDiv = document.getElementById('content');

  switch(page) {
    case 'inicio':
      window.location.href = "index.html";
      break;
    case 'novoTopico':
      contentDiv.innerHTML = '<h1>Criar Novo Tópico</h1>';
      break;
    case 'busca':
      contentDiv.innerHTML = '<h1>Buscar Tópico</h1>';
      break;
    case 'entrar':
      contentDiv.innerHTML = '<h1>Login</h1>';
      break;
  }

}

function startApp(){
  root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"));
}