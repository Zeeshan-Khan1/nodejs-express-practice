import Project from "../models/project.model.js"

// Create project
export const createProject = async (req, res) => {
    try {
        const { name, description, startDate, endDate, projectManager } = req.body

        if (!name || !startDate || !endDate || !projectManager) {
            return res.status(400).json({
                message: "Name, Start Date, End Date, and Project Manager are required"
            })
        }

        const project = new Project(req.body)
        await project.save()
        await project.populate('projectManager', 'name role')

        res.status(201).json({
            message: "Project created successfully",
            project
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Read all projects
export const readAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).populate('projectManager', 'name role')
        
        res.status(200).json({
            success: true,
            message: "All projects retrieved successfully",
            count: projects.length,
            projects: projects
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

// Read single project by ID
export const readProjectById = async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findById(id).populate('projectManager', 'name role')
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            })
        }

        res.status(200).json({
            success: true,
            project
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

// Update project
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        ).populate('projectManager', 'name role')
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project
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

// Delete project
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params
        const deletedProject = await Project.findByIdAndDelete(id)
        
        if (!deletedProject) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            })
        }
        
        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            deletedProject
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

