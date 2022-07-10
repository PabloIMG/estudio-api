import jwt from "jsonwebtoken";

//? Lógica de la generación del token.
export const generarToken = (uid) => {

    //? Variable para indicar la expiración del token.
    const expiresIn = 60 * 15; // 15 minutos.

    try {

        const token = jwt.sign({ uid }, process.env.JWT_SECRET, {expiresIn});
        
        //? Devolvemos el token.
        return {token, expiresIn};

    } catch (error) {

        console.log("\n\nError al generar token!!");

    }

}