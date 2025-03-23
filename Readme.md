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

npm install mongodb mongoose