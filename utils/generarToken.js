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

//? Utilizando el Refresh Token.
export const generarRefreshToken = (uid, res) => {

    const expiresIn = 60 * 60 * 24 * 30; // 1 mes.

    try {
        
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {expiresIn});

        //? Guardamos el Refresh Token en una cookie ya que este nos sirve para generar otro token.
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000),
        });

        console.log("\n\nRefresh Token generado!! [", refreshToken, "]");

    } catch (error) {

        console.log("\n\nError al generar refresh token!! ", error);

    }

}