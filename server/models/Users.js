import mongoose from "mongoose";

// defines new blueprint for a user
const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// creates a model of blueprint
const UserModel = mongoose.model("users", UserSchema);
export { UserModel };