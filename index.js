import "dotenv/config";
import "./database/connectdb.js";
import authRouter from "./routes/auth.route.js";
import express from "express";

const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRouter);

//* Instrucción ejemplo de como usar el token.
app.use(express.static('public')); //? Con esto habilitamos la carpeta public. Para que se pueda ver el index.html.

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("[Server corriendo]\nhttp://localhost:" + PORT + "\n"));
