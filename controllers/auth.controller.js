import { validationResult } from "express-validator";

//? Lógica de las rutas.

//* Register.
export const register = async (req, res) => {

    //* Respuestas.
    console.log("\n................: USUARIO REGISTRADO :................\n", req.body);
    res.json({Pagina: "Registro"});

}

//* Login.
export const login = async (req, res) => {

    //* Respuestas.
    console.log("\n................: USUARIO LOGUEADO :................\n", req.body);
    res.json({Pagina: "Login"});

}
