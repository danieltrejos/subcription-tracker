import express from "express";
import { PORT } from "./config/env.js";

// Importar rutas
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

// Crear una instancia de express para app
const app = express();

// Ruta raiz
app.get("/", (req, res) => {
  res.send(
    "Bienvenido a la app de prueba para express en el cual se implementará una API"
  );
});

// Añadir rutas a la app usando app.use a la ruta localhost:5500/api/v1/
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

// Ruta para confirmar el estado
app.get("/health", (req, res) => {
  res.send(
    `El servidor está funcionando correctamente. Node.js versión: ${process.version}, Puerto: ${PORT}`
  );
});

app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto http://localhost:${PORT}`);
});

export default app;
