import { Router } from 'express';

const authRouter = Router();

// Rutas de autenticación (post al form)

authRouter.post('/sing-up', (req, res) => {
    res.send({ title: 'Sing Up' });
});

authRouter.post('/sing-in', (req, res) => {
    res.send({ title: 'Sing In' });
});

authRouter.post('/logout', (req, res) => {
    res.send({ title: 'Logout' });
});

export default authRouter;

