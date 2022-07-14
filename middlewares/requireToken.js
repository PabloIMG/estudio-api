import jwt from "jsonwebtoken";

//? Validación del Token mediante Cookies.
export const requireTokenCookie = (req, res, next) => {

    try {

        //? Evaluamos la existencia del token.
        let token = req.cookies.token;

        if (!token) 
            throw new Error("No Bearer");

        //? Mostramos info del token.
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        console.log("\n\nValidacion Token: ", uid);

        //? Enviamos info al controlador.
        req.uid = uid;

        next();

    } catch (error) {

        //? Errores de validación del token.
        const tokenErrores = {
            "invalid signature": "Token inválido",
            "jwt expired": "Token expirado",
            "invalid token": "Token no válido",
            "No Bearer": "Utiliza formato Bearer",
        }

        console.log("Error al validar el token: ", error);
        return res
            .status(401)
            .json({ error: tokenErrores[error.message] || "Error al obtener info del usuario" });

    }

}

//? Validación del Token.
export const requireToken = async (req, res, next) => {

    try {

        //? Evaluamos la existencia del token.
        //let token = req.headers?.authorization;

        let token = req.cookies.refreshToken;

        //token = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmJmYTAwZjM5NGExNmQ4OGE4YTgyYzAiLCJpYXQiOjE2NTc3NTc5OTAsImV4cCI6MTY2MDM0OTk5MH0.MH4ZksON92_sb1f5uC_Sfx4HmrzDv5WIIKCUoO6mAyo"
        console.log("REQUIRETOKEN [", token, "]");

        if (!token) 
            throw new Error("No Bearer");

        //? Mostramos info del token.
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        console.log("\n\nValidacion Token: ", uid);

        //? Enviamos info al controlador.
        req.uid = uid;

        next();

    } catch (error) {

        //? Errores de validación del token.
        const tokenErrores = {
            "invalid signature": "Token inválido",
            "jwt expired": "Token expirado",
            "invalid token": "Token no válido",
            "No Bearer": "Utiliza formato Bearer",
        }

        console.log("Error al validar el token: ", error);
        return res
            .status(401)
            .json({ error: tokenErrores[error.message] || "Error al obtener info del usuario" });

    }

}