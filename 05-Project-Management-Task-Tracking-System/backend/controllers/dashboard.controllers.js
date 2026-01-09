import Project from "../models/project.model.js"
import Task from "../models/task.model.js"
import TeamMember from "../models/teamMember.model.js"

// Get dashboard analytics
export const getDashboardStats = async (req, res) => {
    try {
        // Total projects
        const totalProjects = await Project.countDocuments()

        // Total tasks
        const totalTasks = await Task.countDocuments()

        // Tasks by status
        const tasksByStatus = await Task.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ])

        // Tasks per project
        const tasksPerProject = await Task.aggregate([
            {
                $group: {
                    _id: "$project",
                    count: { $sum: 1 },
                    completed: {
                        $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] }
                    },
                    inProgress: {
                        $sum: { $cond: [{ $eq: ["$status", "In Progress"] }, 1, 0] }
                    },
                    toDo: {
                        $sum: { $cond: [{ $eq: ["$status", "To Do"] }, 1, 0] }
                    }
                }
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "_id",
                    foreignField: "_id",
                    as: "project"
                }
            },
            {
                $unwind: "$project"
            },
            {
                $project: {
                    projectId: "$_id",
                    projectName: "$project.name",
                    totalTasks: "$count",
                    completed: 1,
                    inProgress: 1,
                    toDo: 1
                }
            }
        ])

        // Tasks assigned to each team member
        // Use a more robust approach: get all tasks with assigned members, then populate manually
        const tasksWithMembers = await Task.find({
            assignedMembers: { $exists: true, $ne: [] }
        }).populate('assignedMembers', 'name role')

        console.log('Tasks with members found:', tasksWithMembers.length)
        console.log('Sample task:', tasksWithMembers.length > 0 ? JSON.stringify(tasksWithMembers[0], null, 2) : 'No tasks')

        // Process tasks and group by member
        const memberTaskMap = new Map()

        tasksWithMembers.forEach(task => {
            if (task.assignedMembers && task.assignedMembers.length > 0) {
                task.assignedMembers.forEach(member => {
                    if (member && member._id) {
                        const memberId = member._id.toString()
                        
                        if (!memberTaskMap.has(memberId)) {
                            memberTaskMap.set(memberId, {
                                memberId: member._id,
                                memberName: member.name,
                                memberRole: member.role,
                                totalTasks: 0,
                                completed: 0,
                                inProgress: 0,
                                toDo: 0
                            })
                        }

                        const memberStats = memberTaskMap.get(memberId)
                        memberStats.totalTasks++

                        if (task.status === 'Completed') {
                            memberStats.completed++
                        } else if (task.status === 'In Progress') {
                            memberStats.inProgress++
                        } else if (task.status === 'To Do') {
                            memberStats.toDo++
                        }
                    }
                })
            }
        })

        const tasksByMember = Array.from(memberTaskMap.values())
        console.log('Tasks by member result:', JSON.stringify(tasksByMember, null, 2))

        // Overall status breakdown
        const statusBreakdown = {
            "To Do": 0,
            "In Progress": 0,
            "Completed": 0
        }
        
        tasksByStatus.forEach(item => {
            statusBreakdown[item._id] = item.count
        })

        res.status(200).json({
            success: true,
            stats: {
                totalProjects,
                totalTasks,
                statusBreakdown,
                tasksPerProject,
                tasksByMember
            }
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

