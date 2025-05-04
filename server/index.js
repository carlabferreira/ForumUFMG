import express  from 'express';
import rotasAuth from "./routes/auth.js";
import rotasTopico from "./routes/topico.js";
import rotasTags from "./routes/tags.js";
import cookieParser from 'cookie-parser';
import rotasCategoria from "./routes/categoria.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/server/auth", rotasAuth);
app.use("/server/topicos", rotasTopico);
app.use("/server/tags", rotasTags);
app.use("/server/categorias", rotasCategoria);

app.listen(3002, () => {
    console.log("rodando na porta 3002");
});