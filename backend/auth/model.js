
import mongoose from 'mongoose';
import { type } from 'os';

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    name: {
        type: String,
    },
    description : {
        type: String,
    },
    photo: {
        type: String
    },
    role : {
        type: String,
        required: true,
        default: "user"
    }
});

export const User = mongoose.model("User", UserSchema);


const CountSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    count : {
        type: Number,
        required: true
    }
})

export const Count = mongoose.model("Count", CountSchema)