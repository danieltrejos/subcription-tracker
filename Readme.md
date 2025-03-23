# App de prueba de express

## Setup inicial

- Se utiliza express-generator para crear el boilerplate
En terminal:

`npm install express-generator"
`npx express-generator --no-views --git`

-Se instala nodemon para el hotreload

`npm install nodemon --save-dev`

Se modifica el package.json antes de scripts para: ES6 
`"type": "module",`

Se crean script de arranque como dev y start
`"scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
},`

`"start": "nodemon server.js"`

- Se ejecuta un linter (eslint)
`npx eslint --init`

Se usa en modo:
> To check syntax and find problems
> JavaScript modules (import/export)
> None of these (Aqui se podria probar react)
> No typescript

? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
√ Browser
√ Node

se puede ejecutar:  npx eslint .

## Correr un servidor básico:

```node
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenido a la app de prueba para express en el cual se implementará una API");
});

app.listen(3000, () =>{
  console.log("Server started on http://localhost:3000");
});
```

## Configurar variables de entorno

Para gestionar variables de entornos en nodejs podemos utilizar el paquete:
npm install dotenv

## Base de datos

Para la base de datos se usara Mongo DB con Mongoose como ORM para crear los modelos y esquemas mas facilmente

`npm install mongodb mongoose`

- Se debe crear el cluester para el caso un clsuiter gratis en mongo db y obtener la URI de conexión, por el metodo driver nodejs:
mongodb+srv://<user>:<db_password>@cluster0.m3c0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

- luego se procede a crear la uri de conexion como variable de entorno en .env.development.local

DB_URI= mongodb+srv://<user>:<db_password>@cluster0.m3c0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

- Esta se destructura y se exporta de process.env en el env.js

export const { PORT, NODE_ENVIRONMENT, DB_URI } = process.env

Luego se crea el script de conexion a la bd en /database/mongodb.js

Aqui se importa mongoose ademas de las variables de entornos necesarias como NODE_ENVIROMENT y se conecta a la base de datos con la uri de conexion en una funcion de conexion a la base

```js
const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Conectado a la base de datos en ${DB_URI} en ${NODE_ENVIRONMENT} mode`);
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${error}`);
        process.exit(1);
    }
}
```

A continuacion se exporta la funcion de conexion y se importa la conexion al app.js, esta es llamada en el app.listen y se testea la funcion de conexion en el server.js

## Creacion de modelos