import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../config/api'

const AddTeamMember = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Developer'
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.role) {
        setIsError('Name and Role are required')
        return
      }
      
      setIsLoading(true)
      setIsError(false)

      const submitData = new FormData()
      submitData.append('name', formData.name)
      submitData.append('role', formData.role)
      if (imageFile) {
        submitData.append('image', imageFile)
      }
      
      const res = await axios.post(`${API_URL}/team-members`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('Team member created:', res.data)
      navigate('/admin/team-members')
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Error'
      console.error('Error creating team member:', msg)
      setIsError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-xl border p-4">
        <legend className="fieldset-legend">Create New Team Member</legend>

        {isError && <div className="alert alert-error mb-4">{isError}</div>}

        <label className="label">Name</label>
        <input
          name="name"
          type="text"
          className="input w-full"
          value={formData.name}
          onChange={handleFormData}
          placeholder="Enter team member name"
        />

        <label className="label">Role</label>
        <select
          name="role"
          className="select w-full"
          value={formData.role}
          onChange={handleFormData}
        >
          <option value="Admin">Admin</option>
          <option value="Project Manager">Project Manager</option>
          <option value="Developer">Developer</option>
        </select>

        <label className="label">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full"
        />
        {imagePreview && (
          <div className="mt-2">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button
            className="btn btn-neutral flex-1"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Team Member'}
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate('/admin/team-members')}
          >
            Cancel
          </button>
        </div>
      </fieldset>
    </div>
  )
}

export default AddTeamMember

