import express from "express"
const router = express.Router()

import {
    createTask,
    readAllTasks,
    readTaskById,
    updateTask,
    deleteTask,
    addMemberToTask,
    removeMemberFromTask
} from "../controllers/tasks.controllers.js"

// Create task
router.route("/tasks").post(createTask)

// Read all tasks (with optional projectId query param)
router.route("/tasks").get(readAllTasks)

// Read single task by ID
router.route("/tasks/:id").get(readTaskById)

// Update task
router.route("/tasks/:id").put(updateTask)

// Delete task
router.route("/tasks/:id").delete(deleteTask)

// Add member to task
router.route("/tasks/:id/members").post(addMemberToTask)

// Remove member from task
router.route("/tasks/:id/members").delete(removeMemberFromTask)

export default router

