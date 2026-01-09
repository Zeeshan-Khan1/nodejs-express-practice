import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../config/api'

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isDeletingId, setIsDeletingId] = useState(null)

  useEffect(() => {
    handleReadAll()
  }, [])

  const handleReadAll = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await axios.get(`${API_URL}/team-members`)
      setTeamMembers(res.data.teamMembers || [])
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!id) return
    const confirmDelete = window.confirm('Are you sure you want to delete this team member?')
    if (!confirmDelete) return

    try {
      setIsDeletingId(id)
      setError(null)
      await axios.delete(`${API_URL}/team-members/${id}`)
      setTeamMembers((prev) => prev.filter((m) => m._id !== id))
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error'
      setError(msg)
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center justify-between">
        <h1 className="text-2xl font-bold">Team Members</h1>
        <Link to="/admin/add-team-member" className="btn btn-primary">
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
          Add Team Member
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : teamMembers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, idx) => (
                <tr key={member._id || idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      {member.imageUrl ? (
                        <img 
                          src={member.imageUrl} 
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-600 font-semibold text-lg">
                            {member.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span>{member.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${
                      member.role === 'Admin' ? 'badge-error' :
                      member.role === 'Project Manager' ? 'badge-warning' :
                      'badge-info'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/edit-team-member/${member._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(member._id)}
                        disabled={isDeletingId === member._id}
                      >
                        {isDeletingId === member._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">No team members found. Add your first team member!</div>
      )}
    </div>
  )
}

export default TeamMembers

