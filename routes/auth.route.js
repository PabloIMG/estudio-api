import express from 'express';
import { infoUser, login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validacionCampos } from '../middlewares/validacionCampos.js';
import { requireToken } from '../middlewares/requireToken.js';
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
router.get(
    
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

export default router;