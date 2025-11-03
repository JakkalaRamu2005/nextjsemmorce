import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6
    }
}, {
    timestamps: true
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
