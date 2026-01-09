import mongoose from "mongoose"

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Completed"],
        default: "To Do",
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    dueDate: {
        type: Date
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    assignedMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember"
    }]
}, { timestamps: true })

const Task = mongoose.model("Task", taskSchema, "tasks")

export default Task

