import express from "express"
const router = express.Router()
import upload from "../middleware/upload.js"

import {
    createTeamMember,
    readAllTeamMembers,
    readTeamMemberById,
    updateTeamMember,
    deleteTeamMember
} from "../controllers/teamMembers.controllers.js"

// Create team member
router.route("/team-members").post(upload.single('image'), createTeamMember)

// Read all team members
router.route("/team-members").get(readAllTeamMembers)

// Read single team member by ID
router.route("/team-members/:id").get(readTeamMemberById)

// Update team member
router.route("/team-members/:id").put(upload.single('image'), updateTeamMember)

// Delete team member
router.route("/team-members/:id").delete(deleteTeamMember)

export default router

