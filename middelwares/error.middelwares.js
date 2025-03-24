/**
 * @function errorMiddeleware
 * @description Middleware de manejo de errores para aplicaciones Express.
 *              Captura y formatea errores que ocurren durante el procesamiento de una solicitud HTTP,
 *              proporcionando respuestas de error consistentes y útiles al cliente.
 *              Maneja errores específicos de Mongoose (MongoDB ODM) de manera amigable.
 *
 * @param {Error} err El objeto de error pasado por Express. Contiene información sobre el error.
 * @param {object} req El objeto de solicitud HTTP. Contiene información sobre la solicitud del cliente.
 * @param {object} res El objeto de respuesta HTTP. Se utiliza para enviar una respuesta al cliente.
 * @param {function} next La función para pasar el control al siguiente middleware en la cadena.
 *
 * @returns {void}  No retorna nada directamente. Envía una respuesta JSON al cliente con información sobre el error.
 *
 * @throws {Error}  Si ocurre un error dentro del bloque `try`, el bloque `catch` lo captura y pasa el error
 *                 al siguiente middleware de manejo de errores usando `next(error)`.
 *
 * @example
 * // En app.js (o similar):
 * import errorMiddeleware from './middleware/error';
 *
 * // ... definicion de rutas y otros middlewares ...
 *
 * app.use(errorMiddeleware); // Asegurarse de que este sea el ultimo middleware registrado
 *
 */
const errorMiddeleware = (err, req, res, next) => {
    try {

        let error = { ...err };
        error.message = err.message;
        console.error(err)

        //Manejo de un ObjectID inválido de Mongoose
        if (error.name === 'CastError') {
            const message = `Resource not found `;
            error = new Error(message);
            error.statusCode = 404;
        }
        // Manejo de error de clave duplicada de Mongoose
        if (error.code === 11000) {
            const message = `Ingreso un valor duplicado`;
            error = new Error(message);
            error.statusCode = 400;
        }

        // Manejo de error de validación de Mongoose
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map((value) => value.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error'
        });

    }

    catch (error) {
        next(error);
    }
}

export default errorMiddeleware;