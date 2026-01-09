import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../config/api'

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',
    dueDate: '',
    project: '',
    assignedMembers: []
  })
  const [projects, setProjects] = useState([])
  const [teamMembers, setTeamMembers] = useState([])
  const [isError, setIsError] = useState(false)
  const [isLoadingMembers, setIsLoadingMembers] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, membersRes] = await Promise.all([
          axios.get(`${API_URL}/projects`),
          axios.get(`${API_URL}/team-members`)
        ])
        setProjects(projectsRes.data.projects || [])
        setTeamMembers(membersRes.data.teamMembers || [])
      } catch (error) {
        setIsError('Error loading data')
      } finally {
        setIsLoadingMembers(false)
      }
    }
    fetchData()
  }, [])

  const handleFormData = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleMemberToggle = (memberId) => {
    setFormData((prev) => {
      const isSelected = prev.assignedMembers.includes(memberId)
      return {
        ...prev,
        assignedMembers: isSelected
          ? prev.assignedMembers.filter(id => id !== memberId)
          : [...prev.assignedMembers, memberId]
      }
    })
  }

  const handleSubmit = async () => {
    try {
      if (!formData.title) {
        setIsError('Task title is required')
        return
      }
      if (!formData.project) {
        setIsError('Please select a project. Every task must belong to a project.')
        return
      }
      
      const res = await axios.post(`${API_URL}/tasks`, formData)
      console.log('Task created:', res.data)
      navigate('/admin/tasks')
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Error'
      console.error('Error creating task:', msg)
      setIsError(msg)
    }
  }

  return (
    <div className="flex justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-xl border p-4">
        <legend className="fieldset-legend">Create New Task</legend>

        {isError && <div className="alert alert-error mb-4">{isError}</div>}

        <label className="label">Task Title *</label>
        <input
          name="title"
          type="text"
          className="input w-full"
          value={formData.title}
          onChange={handleFormData}
          placeholder="Enter task title"
        />

        <label className="label">Description</label>
        <textarea
          name="description"
          className="textarea w-full"
          value={formData.description}
          onChange={handleFormData}
          placeholder="Enter task description"
          rows="3"
        />

        <label className="label">Project *</label>
        {isLoadingMembers ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <select
            name="project"
            className="select w-full"
            value={formData.project}
            onChange={handleFormData}
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        )}

        <label className="label">Status</label>
        <select
          name="status"
          className="select w-full"
          value={formData.status}
          onChange={handleFormData}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label className="label">Priority</label>
        <select
          name="priority"
          className="select w-full"
          value={formData.priority}
          onChange={handleFormData}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label className="label">Due Date</label>
        <input
          name="dueDate"
          type="date"
          className="input w-full"
          value={formData.dueDate}
          onChange={handleFormData}
        />

        <label className="label">Assign Team Members</label>
        {isLoadingMembers ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto border rounded p-2">
            {teamMembers.map((member) => (
              <label key={member._id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={formData.assignedMembers.includes(member._id)}
                  onChange={() => handleMemberToggle(member._id)}
                />
                <span>{member.name} ({member.role})</span>
              </label>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button
            className="btn btn-neutral flex-1"
            onClick={handleSubmit}
          >
            Create Task
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate('/admin/tasks')}
          >
            Cancel
          </button>
        </div>
      </fieldset>
    </div>
  )
}

export default AddTask

