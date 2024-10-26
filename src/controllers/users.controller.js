import bcryptjs from 'bcryptjs';
import { createUserQuery, deleteUserQuery, getAllUsersQuery, getUserByIdQuery, updateUserQuery } from "../repositories/users.repository.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersQuery();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error getting the users. Please contact the administrator.' });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await getUserByIdQuery(id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error getting the user. Please contact the administrator.' });
    }
}

const createUser = async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;

        if (!name || !lastname || !email || !password) return res.status(400).json({ message: 'Please fill all fields' });

        const passwordHash = await bcryptjs.hash(password, 10);

        const newUser = await createUserQuery({ name, lastname, email, password: passwordHash });

        res.status(201).json({ message: 'User created successfully', data: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating the user. Please contact the administrator.' });
    }   
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastname, email } = req.body;
        
        const user = await getUserByIdQuery(id);

        if (!name || !lastname || !email ) return res.status(400).json({ message: 'Please fill all fields' });
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        const userUpdated = await updateUserQuery(id, { name, lastname, email });

        res.status(200).json({ message: 'User updated successfully', data: userUpdated });
    } catch (error) {
        res.status(500).json({ message: 'Error updating the user. Please contact the administrator.' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await getUserByIdQuery(id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        await deleteUserQuery(id)

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting the user. Please contact the administrator.' });
    }
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };