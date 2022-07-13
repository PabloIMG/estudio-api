import { validationResult } from "express-validator";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generarToken } from "../utils/generarToken.js";

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
        const { token, expiresIn } = generarToken(user.id);

        //? Generamos la cookie.
        /*
            httpOnly: Nos dice que la cookie solo se puede acceder desde el servidor.
            secure: Es para que la cookie solo se pueda acceder desde HTTPS. pero como ahora no estamos
                        en un servidor HTTPS, no se puede usar por lo tanto en el json indicamos que
                        si estamos usando algo distinto a HTTPS lo debe marcar como false.
        */
        res.cookie("token", token, { // token es el cookieValue.
            httpOnly: true,
            secure: !(process.env.MODO === "developer")
        })

        //* Respuestas.
        console.log("\n................: USUARIO LOGUEADO :................\n\nToken[", token, "]\nExpiracion: ", expiresIn, "\n\n", req.body);
        res.json({Pagina: "Login"});

    } catch (error) {

        console.log("\n................: ERROR AL LOGIN :................\n", error);
        res.status(500).json({ error: "Error al loguearse" });

    }

}

export const infoUser = async (req, res) => {

    try {

        const user = await User.findById(req.uid).lean(); //? Con el lean recibimos un objeto simple.
        return res.json({ id: user.id, email: user.email });

    } catch (error) {
        
        console.log("Error al obtener info del usuario: ", error);
        return res.status(500).json({ error: "Error interno" });

    }

}