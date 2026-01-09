import Task from "../models/task.model.js"

// Create task
export const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate, project, assignedMembers } = req.body

        if (!title || !project) {
            return res.status(400).json({
                message: "Title and Project are required"
            })
        }

        const task = new Task({
            title,
            description,
            status: status || "To Do",
            priority: priority || "Medium",
            dueDate,
            project,
            assignedMembers: assignedMembers || []
        })
        
        await task.save()
        await task.populate('project', 'name')
        await task.populate('assignedMembers', 'name role')

        res.status(201).json({
            message: "Task created successfully",
            task
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Read all tasks
export const readAllTasks = async (req, res) => {
    try {
        const { projectId } = req.query
        let query = {}
        
        if (projectId) {
            query.project = projectId
        }

        const tasks = await Task.find(query)
            .populate('project', 'name')
            .populate('assignedMembers', 'name role')
        
        res.status(200).json({
            success: true,
            message: "All tasks retrieved successfully",
            count: tasks.length,
            tasks: tasks
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

// Read single task by ID
export const readTaskById = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
            .populate('project', 'name')
            .populate('assignedMembers', 'name role')
        
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        res.status(200).json({
            success: true,
            task
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

// Update task
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        )
            .populate('project', 'name')
            .populate('assignedMembers', 'name role')
        
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task
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

// Delete task
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const deletedTask = await Task.findByIdAndDelete(id)
        
        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }
        
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            deletedTask
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

// Add member to task
export const addMemberToTask = async (req, res) => {
    try {
        const { id } = req.params
        const { memberId } = req.body

        if (!memberId) {
            return res.status(400).json({
                message: "Member ID is required"
            })
        }

        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        if (!task.assignedMembers.includes(memberId)) {
            task.assignedMembers.push(memberId)
            await task.save()
        }

        await task.populate('project', 'name')
        await task.populate('assignedMembers', 'name role')

        res.status(200).json({
            success: true,
            message: "Member added to task successfully",
            task
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

// Remove member from task
export const removeMemberFromTask = async (req, res) => {
    try {
        const { id } = req.params
        const { memberId } = req.body

        if (!memberId) {
            return res.status(400).json({
                message: "Member ID is required"
            })
        }

        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        task.assignedMembers = task.assignedMembers.filter(
            member => member.toString() !== memberId
        )
        await task.save()

        await task.populate('project', 'name')
        await task.populate('assignedMembers', 'name role')

        res.status(200).json({
            success: true,
            message: "Member removed from task successfully",
            task
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

