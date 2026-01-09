import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../config/api'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isDeletingId, setIsDeletingId] = useState(null)

  useEffect(() => {
    fetchProjects()
    fetchTasks()
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [selectedProject])

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/projects`)
      setProjects(res.data.projects || [])
    } catch (err) {
      console.error('Error fetching projects:', err)
    }
  }

  const fetchTasks = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const url = selectedProject 
        ? `${API_URL}/tasks?projectId=${selectedProject}`
        : `${API_URL}/tasks`
      const res = await axios.get(url)
      setTasks(res.data.tasks || [])
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!id) return
    const confirmDelete = window.confirm('Are you sure you want to delete this task?')
    if (!confirmDelete) return

    try {
      setIsDeletingId(id)
      setError(null)
      await axios.delete(`${API_URL}/tasks/${id}`)
      setTasks((prev) => prev.filter((t) => t._id !== id))
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error'
      setError(msg)
    } finally {
      setIsDeletingId(null)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge-success'
      case 'In Progress':
        return 'badge-warning'
      case 'To Do':
        return 'badge-info'
      default:
        return 'badge'
    }
  }

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'badge-error'
      case 'Medium':
        return 'badge-warning'
      case 'Low':
        return 'badge-info'
      default:
        return 'badge'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Link to="/admin/add-task" className="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add Task
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        <label className="label">Filter by Project:</label>
        <select
          className="select select-bordered"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
        <button
          className="btn btn-sm btn-secondary"
          onClick={fetchTasks}
        >
          Refresh
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : tasks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Project</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Assigned Members</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, idx) => (
                <tr key={task._id || idx}>
                  <td>{idx + 1}</td>
                  <td className="font-semibold">{task.title}</td>
                  <td>
                    {task.project ? (
                      <span className="badge badge-primary">
                        {task.project.name}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>
                    {task.priority && (
                      <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
                        {task.priority}
                      </span>
                    )}
                  </td>
                  <td>{formatDate(task.dueDate)}</td>
                  <td>
                    {task.assignedMembers && task.assignedMembers.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {task.assignedMembers.map((member) => (
                          <span key={member._id} className="badge badge-outline">
                            {member.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">Unassigned</span>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/edit-task/${task._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(task._id)}
                        disabled={isDeletingId === task._id}
                      >
                        {isDeletingId === task._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">No tasks found. Add your first task!</div>
      )}
    </div>
  )
}

export default Tasks

