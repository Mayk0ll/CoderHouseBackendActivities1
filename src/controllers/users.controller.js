import bcryptjs from 'bcryptjs';
import { createUserQuery, deleteUserQuery, getAllUsersQuery, getUserByEmailQuery, getUserByIdQuery, updateUserQuery } from "../repositories/users.repository.js";

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
        const { firstName, lastName, email, gender, password } = req.body;
         
        if (!firstName || !lastName || !email || !password, !gender) return res.status(400).json({ message: 'Please fill all fields' });

        const passwordHash = await bcryptjs.hash(password, 10);

        const newUser = await createUserQuery({ firstName, lastName, email, gender, password: passwordHash });

        res.status(201).json({ data: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating the user. Please contact the administrator.' });
    }   
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, gender } = req.body;
        
        const user = await getUserByIdQuery(id);

        if (!firstName || !lastName || !email || !gender ) return res.status(400).json({ message: 'Please fill all fields' });
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        const userUpdated = await updateUserQuery(id, { firstName, lastName, email, gender });

        res.status(200).json({ data: userUpdated });
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

        res.status(200).json({ data: 'User deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting the user. Please contact the administrator.' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: 'Please fill all fields' });

        const user = await getUserByEmailQuery(email);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in. Please contact the administrator.' });
    }
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser, login };