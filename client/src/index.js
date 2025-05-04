import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";  // 🚨 Importante!

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>   {/* ✅ O Router vem AQUI */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
