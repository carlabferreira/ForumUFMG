import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../validations/schemas";
import { authLogin } from "../services/authService";
import { Link } from "react-router-dom";
import "../styles/Login.css";

function LoginPage({ setUser }) {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const data = await authLogin(values);
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Erro ao fazer login.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
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
          <button className="button" type="submit">Login</button>
        </Form>
      </Formik>
      <div className="register-redirect">
        <p>
            Não tem uma conta? <Link className="link-cadastro" to="/cadastro">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
