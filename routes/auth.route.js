import express from 'express';
import { infoUser, login, register, refreshToken } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validacionCampos } from '../middlewares/validacionCampos.js';
import { requireToken, requireTokenCookie } from '../middlewares/requireToken.js';
const router = express.Router();

//? .: RUTAS :. ?//

//* Registro.
router.get(

    "/register",
    [
        body('email', "Email invalido").isEmail().normalizeEmail(),
        body('password', "Password invalido").isLength({ min: 6 }),
    ],
    validacionCampos,
    register

);

//* login.
router.post(
    
    "/login",
    [
        body('email', "Email invalido").isEmail().normalizeEmail(),
        body('password', "Password invalido").isLength({ min: 6 }),
    ],
    validacionCampos,
    login
    
);

//* Función prueba para ver comportamiento del token.
router.get("/protected", requireToken, infoUser);

//* Ruta para validar el refreshToken el cual siendo valido nos devuelve el token que puede hacer peticiones.
router.get("/refresh", refreshToken);

//* Función prueba para ver comportamiento del token en una cookie.
//router.get("/protected", requireTokenCookie, infoUser);

export default router;