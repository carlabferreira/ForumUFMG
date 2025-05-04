import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import CriarTag from "./CriarTag";
import Home from "./Home";

function Dashboard({ user, logout }) {
  const navigate = useNavigate();

  return (
    <div className="container">
      {user.tipo === "Técnico-Administrativo" ? (
        <>
          <h1>Bem-vindo, Técnico {user.nome || user.email}!</h1>
          <button className="button" onClick={logout}>Logout</button>
          <button className="button" onClick={() => navigate("/criar-tag")}>
            Criar Tag
          </button>
        </>
      ) : user.tipo === "Professor" ? (
        <>
          <h1>Bem-vindo, Professor {user.nome || user.email}!</h1>
          <button className="button" onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <h1>Bem-vindo, {user.nome || user.email}!</h1>
          <button className="button" onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

function LoginPage({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    Axios.post("http://localhost:3002/server/auth/login", {
      email: values.email,
      senha: values.password,
    }).then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        navigate("/dashboard");
      }
    });
  };

  const handleRegister = (values) => {
    Axios.post("http://localhost:3002/server/auth/cadastro", {
      matricula: values.matricula,
      email: values.email,
      nome: values.nome,
      senha: values.password,
      tipo: values.tipo,
    }).then((response) => {
      alert(response.data.msg);
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup.string().email("Email inválido").required("O email é obrigatório"),
    password: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("A senha é obrigatória"),
  });

  const validationsRegister = yup.object().shape({
    matricula: yup
      .string()
      .matches(/^\d{10}$/, "A matrícula deve conter exatamente 10 dígitos")
      .required("A matrícula é obrigatória"),
    nome: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("Email inválido").required("O email é obrigatório"),
    tipo: yup
      .string()
      .oneOf(["Aluno", "Professor", "Técnico-Administrativo"], "Tipo inválido")
      .required("O tipo é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas são diferentes")
      .required("A confirmação da senha é obrigatória"),
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
        validationSchema={validationsLogin}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" type="email" className="form-field" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="password" type="password" className="form-field" placeholder="Senha" />
            <ErrorMessage component="span" name="password" className="form-error" />
          </div>
          <button className="button" type="submit">
            Login
          </button>
        </Form>
      </Formik>

      <h1>Cadastro</h1>
      <Formik
        initialValues={{
          matricula: "",
          nome: "",
          email: "",
          tipo: "",
          password: "",
          confirmation: "",
        }}
        onSubmit={handleRegister}
        validationSchema={validationsRegister}
      >
        <Form className="register-form">
          <div className="form-group">
            <Field name="matricula" type="text" className="form-field" placeholder="Matrícula" />
            <ErrorMessage component="span" name="matricula" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="nome" type="text" className="form-field" placeholder="Nome completo" />
            <ErrorMessage component="span" name="nome" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="email" type="email" className="form-field" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="tipo" as="select" className="form-field">
              <option value="">Selecione o tipo</option>
              <option value="Aluno">Aluno</option>
              <option value="Professor">Professor</option>
              <option value="Técnico-Administrativo">Técnico-Administrativo</option>
            </Field>
            <ErrorMessage component="span" name="tipo" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="password" type="password" className="form-field" placeholder="Senha" />
            <ErrorMessage component="span" name="password" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="confirmation" type="password" className="form-field" placeholder="Confirmar Senha" />
            <ErrorMessage component="span" name="confirmation" className="form-error" />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </Formik>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} logout={logout} /> : <LoginPage user={user} setUser={setUser} />} />
        <Route path="/criar-tag" element={<CriarTag />} />
      </Routes>
    </Router>
  );
}

export default App;

