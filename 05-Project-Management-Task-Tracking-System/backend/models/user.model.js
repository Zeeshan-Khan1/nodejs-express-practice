import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
    profilePicture: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema, "users")

export default User

