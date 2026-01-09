import express from "express"
const router = express.Router()

import { getDashboardStats } from "../controllers/dashboard.controllers.js"

// Get dashboard statistics
router.route("/dashboard/stats").get(getDashboardStats)

export default router

