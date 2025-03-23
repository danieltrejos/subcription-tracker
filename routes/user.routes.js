import { Router } from "express";

// Importar router de usuarios

const userRouter = Router();

// Rutas para /users

userRouter.get("/", (req, res) => {
	res.send({ title: "GET all users" });
});

userRouter.get("/:id", (req, res) => {
	res.send({
		title: "GET user details by id"
	});
});

userRouter.post("/", (req, res) => {
	res.send({ title: "Create new user" });
});

userRouter.put("/:id", (req, res) => {
	res.send({ title: "UPDATE user by id" });
});

userRouter.delete("/", (req, res) => {
	res.send({ title: "Delete user by id" });
});

export default userRouter;