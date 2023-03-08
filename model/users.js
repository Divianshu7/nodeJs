import mongoose from "mongoose";
import { Schema } from "mongoose";
const users = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    }
}, { timestamps: true });

export const Users = mongoose.model("Users", users)