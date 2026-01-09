import express from "express"
const router = express.Router()

import {
    createProject,
    readAllProjects,
    readProjectById,
    updateProject,
    deleteProject
} from "../controllers/projects.controllers.js"

// Create project
router.route("/projects").post(createProject)

// Read all projects
router.route("/projects").get(readAllProjects)

// Read single project by ID
router.route("/projects/:id").get(readProjectById)

// Update project
router.route("/projects/:id").put(updateProject)

// Delete project
router.route("/projects/:id").delete(deleteProject)

export default router

