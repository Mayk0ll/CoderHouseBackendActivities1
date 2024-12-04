import UserModel from "../models/user.model.js"

const getAllUsersQuery = async () => {
    return await UserModel.find();
}

const getUserByIdQuery = async (id) => {
    return await UserModel.findById(id);
}

const getUserByEmailQuery = async (email) => {
    return await UserModel.findOne({ email });
}

const createUserQuery = async (user) => {
    return await UserModel.create(user);
}

const updateUserQuery = async (id, user) => {
    return await UserModel.findByIdAndUpdate(id, user);
}

const deleteUserQuery = async (id) => {
    return await UserModel.findByIdAndUpdate(id, {active: false});
}

export { createUserQuery, getAllUsersQuery, getUserByIdQuery, getUserByEmailQuery, updateUserQuery, deleteUserQuery };