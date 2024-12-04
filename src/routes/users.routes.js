import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, login, updateUser } from "../controllers/users.controller.js";

const router = Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.post('/login', login);

export default router;