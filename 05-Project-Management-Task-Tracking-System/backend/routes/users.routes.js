import express from "express"
const router = express.Router()
import upload from "../middleware/upload.js"

import {
    createUser,
    readAllUsers,
    readUserById,
    updateUser
} from "../controllers/users.controllers.js"

// Create user and Read all users
router.route("/users")
    .post(upload.single('profilePicture'), createUser)
    .get(readAllUsers)

// Read single user by ID
router.route("/users/:id").get(readUserById)

// Update user
router.route("/users/:id").put(upload.single('profilePicture'), updateUser)

export default router

