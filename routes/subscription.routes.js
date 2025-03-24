import { Router } from 'express';

const subscriptionRouter = Router();

// GET /subscriptions
subscriptionRouter.get('/', (req, res) => {
    res.send({ title: 'GET all subscriptions' });
});

// GET /subscriptions/:id
subscriptionRouter.get('/:id', (req, res) => {
    res.send({ title: `GET subscription with id: ${req.params.id}` });
});

// POST /subscriptions
subscriptionRouter.post('/', (req, res) => {
    res.send({ title: 'POST create new subscription' });
});

// PUT /subscriptions/:id
subscriptionRouter.put('/:id', (req, res) => {
    res.send({ title: `PUT update subscription with id: ${req.params.id}` });
});

// DELETE /subscriptions/:id
subscriptionRouter.delete('/:id', (req, res) => {
    res.send({ title: `DELETE subscription with id: ${req.params.id}` });
});

// Logica de negocio
// Obtener las susbcriptions de un usuario
subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({ title: `GET subscriptions of user with id: ${req.params.id}` });
});

// cancelar las susbcriptions de un usuario
subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({ title: `PUT cancel subscriptions of user with id: ${req.params.id}` });
});


// Proximas renovaciones de susbcriptions
subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ title: 'GET upcoming subscription renewals' });
});

export default subscriptionRouter;