import { Router } from 'express';

const authRouter = Router();

// Rutas de autenticación (post al form)

authRouter.post('/sing-up', (req, res) => {
    res.send({ title: 'Login' });
});

authRouter.post('/sing-in', (req, res) => {
    res.send({ title: 'Sing In' });
});

authRouter.post('/logout', (req, res) => {
    res.send({ title: 'Logout' });
});

export default authRouter;
// Compare this snippet from routes/subscription.routes.js:
