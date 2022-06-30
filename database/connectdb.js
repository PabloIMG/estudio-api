import mongoose from "mongoose";

try {

    await mongoose.connect(process.env.URI_MONGO);
    console.log("\n[DB conectada]\n");

} catch (error) {

    console.log("\n[Error al conectar la DB] " + error);

}