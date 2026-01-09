import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../../../config/api'

const EditProject = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    projectManager: ''
  })
  const [teamMembers, setTeamMembers] = useState([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMembers, setIsLoadingMembers] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch team members
        const membersRes = await axios.get(`${API_URL}/team-members`)
        setTeamMembers(membersRes.data.teamMembers || [])
        setIsLoadingMembers(false)

        // Fetch project
        const projectRes = await axios.get(`${API_URL}/projects/${id}`)
        const project = projectRes.data.project
        setFormData({
          name: project.name,
          description: project.description || '',
          startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
          endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
          projectManager: project.projectManager?._id || ''
        })
      } catch (error) {
        setIsError(error?.response?.data?.message || 'Error loading data')
      } finally {
        setIsLoading(false)
      }
    }
    if (id) {
      fetchData()
    }
  }, [id])

  const handleFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.startDate || !formData.endDate || !formData.projectManager) {
        setIsError('Name, Start Date, End Date, and Project Manager are required')
        return
      }
      
      await axios.put(`${API_URL}/projects/${id}`, formData)
      navigate('/admin/projects')
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Error'
      setIsError(msg)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>
  }

  return (
    <div className="flex justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-xl border p-4">
        <legend className="fieldset-legend">Edit Project</legend>

        {isError && <div className="alert alert-error mb-4">{isError}</div>}

        <label className="label">Project Name *</label>
        <input
          name="name"
          type="text"
          className="input w-full"
          value={formData.name}
          onChange={handleFormData}
          placeholder="Enter project name"
        />

        <label className="label">Description</label>
        <textarea
          name="description"
          className="textarea w-full"
          value={formData.description}
          onChange={handleFormData}
          placeholder="Enter project description"
          rows="3"
        />

        <label className="label">Start Date *</label>
        <input
          name="startDate"
          type="date"
          className="input w-full"
          value={formData.startDate}
          onChange={handleFormData}
        />

        <label className="label">End Date *</label>
        <input
          name="endDate"
          type="date"
          className="input w-full"
          value={formData.endDate}
          onChange={handleFormData}
        />

        <label className="label">Project Manager *</label>
        {isLoadingMembers ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <select
            name="projectManager"
            className="select w-full"
            value={formData.projectManager}
            onChange={handleFormData}
          >
            <option value="">Select Project Manager</option>
            {teamMembers.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name} ({member.role})
              </option>
            ))}
          </select>
        )}

        <div className="flex gap-2 mt-4">
          <button
            className="btn btn-neutral flex-1"
            onClick={handleSubmit}
          >
            Update Project
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate('/admin/projects')}
          >
            Cancel
          </button>
        </div>
      </fieldset>
    </div>
  )
}

export default EditProject

