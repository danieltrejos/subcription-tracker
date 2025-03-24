import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";

// Importar la conexión a la base de datos
import connectToDatabase from "./database/mongodb.js";

// Importar rutas
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import errorMiddeleware from './middelwares/error.middelwares';

// Crear una instancia de express para app
const app = express();

// Ruta raiz
app.get("/", (req, res) => {
  res.send(
    "Bienvenido a la app de prueba para express en el cual se implementará una API"
  );
});

// Middleware para parsear JSON
app.use(express.json());
// Middleware para parsear URL encoded
app.use(express.urlencoded({ extended: false }));
// Middleware cookie parser
app.use(cookieParser());


// Añadir rutas a la app usando app.use a la ruta localhost:5500/api/v1/
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

// Middleware para manejar errores
app.use(errorMiddeleware);


// Ruta para confirmar el estado
app.get("/health", (req, res) => {
  res.send(
    `El servidor está funcionando correctamente. Node.js versión: ${process.version}, Puerto: ${PORT}`
  );
});

app.listen(PORT, async () => {
  console.log(`Server escuchando en el puerto http://localhost:${PORT}`);

  // Conectar a la base de datos
  await connectToDatabase();
});

export default app;
