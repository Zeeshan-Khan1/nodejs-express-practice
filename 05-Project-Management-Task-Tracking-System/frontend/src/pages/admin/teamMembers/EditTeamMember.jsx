import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../../../config/api'

const EditTeamMember = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    role: 'Developer'
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const res = await axios.get(`${API_URL}/team-members/${id}`)
        setFormData({
          name: res.data.teamMember.name,
          role: res.data.teamMember.role
        })
        if (res.data.teamMember.imageUrl) {
          setCurrentImageUrl(res.data.teamMember.imageUrl)
          setImagePreview(res.data.teamMember.imageUrl)
        }
      } catch (error) {
        setIsError(error?.response?.data?.message || 'Error loading team member')
      } finally {
        setIsLoading(false)
      }
    }
    if (id) {
      fetchTeamMember()
    }
  }, [id])

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
      
      setIsSubmitting(true)
      setIsError(false)

      const submitData = new FormData()
      submitData.append('name', formData.name)
      submitData.append('role', formData.role)
      if (imageFile) {
        submitData.append('image', imageFile)
      }
      
      await axios.put(`${API_URL}/team-members/${id}`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      navigate('/admin/team-members')
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Error'
      setIsError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>
  }

  return (
    <div className="flex justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-xl border p-4">
        <legend className="fieldset-legend">Edit Team Member</legend>

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
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Team Member'}
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

export default EditTeamMember

