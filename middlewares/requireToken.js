import jwt from "jsonwebtoken";

//? Validación del Token.
export const requireToken = (req, res, next) => {

    try {

        //? Evaluamos la existencia del token.
        let token = req.headers?.authorization;

        if (!token) 
            throw new Error("No Bearer");

        token = token.split(" ")[2];

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