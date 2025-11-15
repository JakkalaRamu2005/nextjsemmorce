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
    },
    // NEW FIELDS FOR PROFILE
    bio: {
        type: String,
        maxlength: 500,
        default: ""
    },
    profilePicture: {
        type: String,
        default: ""
    },
    stats: {
        uploads: {
            type: Number,
            default: 0
        },
        downloads: {
            type: Number,
            default: 0
        },
        points: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true  // This adds createdAt and updatedAt automatically
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
