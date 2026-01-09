import User from "../models/user.model.js"
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"

// Create user
export const createUser = async (req, res) => {
    try {
        const { email, password, role } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            })
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            })
        }

        let profilePicture = ""
        
        // Upload profile picture to Cloudinary if file exists
        if (req.file) {
            try {
                profilePicture = await uploadToCloudinary(req.file, 'users')
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError)
                return res.status(500).json({
                    success: false,
                    message: "Failed to upload profile picture",
                    error: uploadError.message
                })
            }
        }

        const userData = {
            email,
            password,
            role: role || "User", // Default to "User" if not provided
            profilePicture
        }

        const user = new User(userData)
        await user.save()

        // Return user without password
        const userResponse = user.toObject()
        delete userResponse.password

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: userResponse
        })
    } catch (error) {
        console.error("Error creating user:", error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Read all users
export const readAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password')
        
        res.status(200).json({
            success: true,
            message: "All users retrieved successfully",
            count: users.length,
            users: users
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Read single user by ID
export const readUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).select('-password')
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Update user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { email, password, role } = req.body

        // Get current user to check for old profile picture
        const currentUser = await User.findById(id)
        
        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        let updateData = {}
        
        if (email) {
            updateData.email = email
        }
        
        if (password) {
            updateData.password = password
        }

        if (role) {
            updateData.role = role
        }

        // Handle profile picture upload
        if (req.file) {
            try {
                // Delete old profile picture from Cloudinary if it exists
                if (currentUser.profilePicture) {
                    try {
                        await deleteFromCloudinary(currentUser.profilePicture)
                        console.log('Old profile picture deleted from Cloudinary')
                    } catch (deleteError) {
                        console.error('Error deleting old profile picture:', deleteError)
                        // Continue with upload even if delete fails
                    }
                }

                // Upload new image to Cloudinary
                const imageUrl = await uploadToCloudinary(req.file, 'users')
                updateData.profilePicture = imageUrl
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError)
                return res.status(500).json({
                    success: false,
                    message: "Failed to upload image",
                    error: uploadError.message
                })
            }
        }

        const user = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password')
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

