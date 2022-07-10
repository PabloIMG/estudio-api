import jwt from "jsonwebtoken";

//? Validación del Token.
export const requireToken = (req, res, next) => {

    try {

        //? Evaluamos la existencia del token.
        let token = req.headers?.authorization;

        if (!token) 
            throw new Error("No hay token");

        token = token.split(" ")[3];

        //? Mostramos info del token.
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        console.log("\n\nValidacion Token: ", uid);

        //? Enviamos info al controlador.
        req.uid = uid;

        next();

    } catch (error) {

        console.log("\n\nError al validar token!! ", error.message);
        return res.status(401).json({ error: error.message });

    }

}