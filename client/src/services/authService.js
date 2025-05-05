import Axios from "axios";

Axios.defaults.withCredentials = true;

export const authLogin = (values) => {
  return Axios.post("http://localhost:3002/server/auth/login", {
    email: values.email,
    senha: values.password,
  }).then((res) => res.data);
};

export const authRegister = (values) => {
  return Axios.post("http://localhost:3002/server/auth/cadastro", {
    matricula: values.matricula,
    nome: values.nome,
    email: values.email,
    tipo: values.tipo,
    senha: values.password,
  }).then((res) => res.data);
};
