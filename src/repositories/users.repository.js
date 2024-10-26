import UserModel from "../models/user.model.js"

const getAllUsersQuery = () => {
    return UserModel.find({active: true});
}

const getUserByIdQuery = (id) => {
    return UserModel.findById(id);
}

const getUserByEmailQuery = (email) => {
    return UserModel.findOne({email});
}

const createUserQuery = (user) => {
    return UserModel.create(user);
}

const updateUserQuery = (id, user) => {
    return UserModel.findByIdAndUpdate(id, user);
}

const deleteUserQuery = (id) => {
    return UserModel.findByIdAndUpdate(id, {active: false});
}

export { createUserQuery, getAllUsersQuery, getUserByIdQuery, getUserByEmailQuery, updateUserQuery, deleteUserQuery };