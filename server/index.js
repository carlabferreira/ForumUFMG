import express  from 'express';
import rotasAuth from "./routes/auth.js";
import rotasTopico from "./routes/topicos.js";
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/server/auth", rotasAuth);
app.use("/server/topicos", rotasTopico);

app.listen(3002, () => {
    console.log("rodando na porta 3002");
});