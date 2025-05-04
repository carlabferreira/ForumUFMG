import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema } from "../validations/schemas";
import { authRegister } from "../services/authService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Cadastro.css";

function RegisterPage() {
    
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const data = await authRegister(values);
      alert(data.msg);
      navigate("/login");
    } catch (error) {
      alert("Erro ao cadastrar.");
      console.error(error);
    }
  };

  return (
    <div className="container">
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
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        <Form className="register-form">
          <div className="form-group">
            <Field name="matricula" placeholder="Matrícula" className="form-field" />
            <ErrorMessage name="matricula" component="span" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="nome" placeholder="Nome completo" className="form-field" />
            <ErrorMessage name="nome" component="span" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="email" type="email" placeholder="Email" className="form-field" />
            <ErrorMessage name="email" component="span" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="tipo" as="select" className="form-field">
              <option value="">Selecione o tipo</option>
              <option value="Aluno">Aluno</option>
              <option value="Professor">Professor</option>
              <option value="Técnico-Administrativo">Técnico-Administrativo</option>
            </Field>
            <ErrorMessage name="tipo" component="span" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="password" type="password" placeholder="Senha" className="form-field" />
            <ErrorMessage name="password" component="span" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="confirmation" type="password" placeholder="Confirmar Senha" className="form-field" />
            <ErrorMessage name="confirmation" component="span" className="form-error" />
          </div>
          <button type="submit" className="button">Cadastrar</button>
        </Form>
      </Formik>
      <div className="login-redirect">
          <p>
              Já é cadastrado? <Link className="link-login" to="/login">Fazer login</Link>
          </p>
      </div>
    </div>
  );
}

export default RegisterPage;
