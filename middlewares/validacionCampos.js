import { validationResult } from "express-validator";

export const validacionCampos = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    next();

}