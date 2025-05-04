import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  password: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("A senha é obrigatória"),
});

export const registerSchema = yup.object().shape({
  matricula: yup
    .string()
    .matches(/^\d{10}$/, "A matrícula deve conter exatamente 10 dígitos")
    .required("A matrícula é obrigatória"),
  nome: yup.string().required("O nome é obrigatório"),
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  tipo: yup.string().oneOf(["Aluno", "Professor", "Técnico-Administrativo"], "Tipo inválido").required("O tipo é obrigatório"),
  password: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("A senha é obrigatória"),
  confirmation: yup.string().oneOf([yup.ref("password"), null], "As senhas são diferentes").required("Confirme sua senha"),
});
