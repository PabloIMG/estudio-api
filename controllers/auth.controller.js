import { validationResult } from "express-validator";
import { User } from "../models/User.js";

//? Lógica de las rutas.

//* Register.
export const register = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = new User({ email, password });
        await user.save();

        //* Respuestas.
        console.log("\n................: USUARIO REGISTRADO :................\n", req.body);

        //? Generamos el token.


        return res.json({Registro: true});

    } catch (error) {

        console.log("\n................: ERROR AL REGISTRAR USUARIO :................\n", error);
        
        // Codigo del error cuando se repite el valor.
        if (error.code === 11000) {

            return res.status(400).json({ error: "El usuario ya existe" });

        }

    }
}

//* Login.
export const login = async (req, res) => {

    try {

        // Destructuring.
        const { email, password } = req.body;

        //? Buscamos al usuario por correo.
        let user = await User.findOne({ email });

        if (!user) 
            return res.status(403).json({ error: "Credenciales incorrectas" });

        //? Verificamos la contraseña.

        let respuestaPassword = await user.comparePassword(password);

        if (!respuestaPassword)
            return res.status(403).json({ error: "Credenciales incorrectas" });

        //? Generamos el token.


        //* Respuestas.
        console.log("\n................: USUARIO LOGUEADO :................\n", req.body);
        res.json({Pagina: "Login"});

    } catch (error) {

        console.log("\n................: ERROR AL LOGIN :................\n", error);
        res.status(500).json({ error: "Error al loguearse" });

    }

}
