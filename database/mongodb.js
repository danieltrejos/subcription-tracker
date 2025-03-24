import mongoose from "mongoose";
import { DB_URI, NODE_ENVIRONMENT } from "../config/env.js";

if (!DB_URI) {
    throw new Error("No se ha encontrado la URL de la base de datos, por favor define la vairiable MONGODB_URI dentro .env.<development/production>.local");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Conectado a la base de datos en ${DB_URI} en ${NODE_ENVIRONMENT} mode`);
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${error}`);
        process.exit(1);
    }
}

export default connectToDatabase;