import mongoose from "mongoose"

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember",
        required: true
    }
}, { timestamps: true })

const Project = mongoose.model("Project", projectSchema, "projects")

export default Project

