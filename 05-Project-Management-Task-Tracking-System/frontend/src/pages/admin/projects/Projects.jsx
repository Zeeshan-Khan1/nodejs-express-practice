import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../config/api'

const Projects = () => {
  const [projects, setProjects] = useState([])
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
      const res = await axios.get(`${API_URL}/projects`)
      setProjects(res.data.projects || [])
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!id) return
    const confirmDelete = window.confirm('Are you sure you want to delete this project?')
    if (!confirmDelete) return

    try {
      setIsDeletingId(id)
      setError(null)
      await axios.delete(`${API_URL}/projects/${id}`)
      setProjects((prev) => prev.filter((p) => p._id !== id))
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

  return (
    <div className="space-y-6">
      <div className="flex gap-2 items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-base-content/60 mt-1">Manage and track all your projects</p>
        </div>
        <Link to="/admin/add-project" className="btn btn-primary gap-2 shadow-lg hover:shadow-xl transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
          Add Project
        </Link>
      </div>

      {error && (
        <div className="alert alert-error shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : projects.length > 0 ? (
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
            <thead>
              <tr className="bg-base-200">
                <th className="font-semibold">#</th>
                <th className="font-semibold">Name</th>
                <th className="font-semibold">Description</th>
                <th className="font-semibold">Start Date</th>
                <th className="font-semibold">End Date</th>
                <th className="font-semibold">Project Manager</th>
                <th className="font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <tr key={project._id || idx}>
                  <td>{idx + 1}</td>
                  <td className="font-semibold">{project.name}</td>
                  <td className="max-w-xs">
                    <div className="truncate" title={project.description || '-'}>
                      {project.description || '-'}
                    </div>
                  </td>
                  <td>{formatDate(project.startDate)}</td>
                  <td>{formatDate(project.endDate)}</td>
                  <td>
                    {project.projectManager ? (
                      <span className="badge badge-primary badge-lg shadow-md">
                        {project.projectManager.name}
                      </span>
                    ) : (
                      <span className="text-base-content/40">-</span>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/edit-project/${project._id}`}
                        className="btn btn-sm btn-primary shadow-md hover:shadow-lg transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-error shadow-md hover:shadow-lg transition-all"
                        onClick={() => handleDelete(project._id)}
                        disabled={isDeletingId === project._id}
                      >
                        {isDeletingId === project._id ? (
                          <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex flex-col items-center justify-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-base-content/60 mb-4">Get started by adding your first project</p>
              <Link to="/admin/add-project" className="btn btn-primary gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Add Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects

