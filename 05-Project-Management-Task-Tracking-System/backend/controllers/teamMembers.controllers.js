import TeamMember from "../models/teamMember.model.js"
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"

// Create team member
export const createTeamMember = async (req, res) => {
    try {
        console.log("Request body:", req.body)
        console.log("Request file:", req.file ? "File exists" : "No file")
        
        const { name, role } = req.body

        if (!name || !role) {
            return res.status(400).json({
                success: false,
                message: "Name and Role are required"
            })
        }

        let imageUrl = ""
        
        // Upload image to Cloudinary if file exists
        if (req.file) {
            try {
                console.log("Uploading image to Cloudinary...")
                imageUrl = await uploadToCloudinary(req.file)
                console.log("Image uploaded successfully:", imageUrl)
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError)
                return res.status(500).json({
                    success: false,
                    message: "Failed to upload image",
                    error: uploadError.message
                })
            }
        }

        const teamMemberData = {
            name,
            role,
            imageUrl
        }

        console.log("Creating team member with data:", teamMemberData)
        const teamMember = new TeamMember(teamMemberData)
        await teamMember.save()

        res.status(201).json({
            success: true,
            message: "Team member created successfully",
            teamMember
        })
    } catch (error) {
        console.error("Error creating team member:", error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        })
    }
}

// Read all team members
export const readAllTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find({})
        
        res.status(200).json({
            success: true,
            message: "All team members retrieved successfully",
            count: teamMembers.length,
            teamMembers: teamMembers
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

// Read single team member by ID
export const readTeamMemberById = async (req, res) => {
    try {
        const { id } = req.params
        const teamMember = await TeamMember.findById(id)
        
        if (!teamMember) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            })
        }

        res.status(200).json({
            success: true,
            teamMember
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

// Update team member
export const updateTeamMember = async (req, res) => {
    try {
        const { id } = req.params
        const { name, role } = req.body

        // Get current team member to check for old image
        const currentMember = await TeamMember.findById(id)
        
        if (!currentMember) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            })
        }

        let updateData = { name, role }

        // Upload new image to Cloudinary if file exists
        if (req.file) {
            try {
                // Delete old image from Cloudinary if it exists
                if (currentMember.imageUrl) {
                    try {
                        await deleteFromCloudinary(currentMember.imageUrl)
                        console.log('Old team member image deleted from Cloudinary')
                    } catch (deleteError) {
                        console.error('Error deleting old team member image:', deleteError)
                        // Continue with upload even if delete fails
                    }
                }

                // Upload new image to Cloudinary
                const imageUrl = await uploadToCloudinary(req.file, 'team-members')
                updateData.imageUrl = imageUrl
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError)
                return res.status(500).json({
                    success: false,
                    message: "Failed to upload image",
                    error: uploadError.message
                })
            }
        }

        const teamMember = await TeamMember.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )

        res.status(200).json({
            success: true,
            message: "Team member updated successfully",
            teamMember
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

// Delete team member
export const deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params
        const deletedMember = await TeamMember.findByIdAndDelete(id)
        
        if (!deletedMember) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            })
        }
        
        res.status(200).json({
            success: true,
            message: "Team member deleted successfully",
            deletedMember
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

