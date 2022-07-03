import mongoose from  "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema ({

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    }

})

//? Agregamos la funcion de encriptacion de la contraseña.
userSchema.pre('save', async function(next) {

    //? Información de la instancia del schema.
    const user = this;

    if (!user.isModified('password')) return next();

    try {

        const salto = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salto);

        next();

    } catch (error) {

        console.log("Error al encriptar la contraseña: ", error);
        throw new Error("Error al encriptar la contraseña", error);

    }

});

//? Creamos método para verificar la contraseña ingresada.
userSchema.methods.comparePassword = async function(candidatePassword) {

    return await bcrypt.compare(candidatePassword, this.password);

}

export const User = mongoose.model('User', userSchema);