import { Schema, model } from "mongoose";

const userModel = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Femenino', 'Masculino'],
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userModel.methods.toJSON = function() {
    const {_id, ...user} = this.toObject();
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    user.id = _id;
    return user;
}

const UserModel = model('User', userModel);

export default UserModel;