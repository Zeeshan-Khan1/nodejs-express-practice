import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../../config/api'

const Stats = () => {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await axios.get(`${API_URL}/dashboard/stats`)
      setStats(res.data.stats)
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error loading statistics'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error">
        {error}
        <button className="btn btn-sm" onClick={fetchStats}>Retry</button>
      </div>
    )
  }

  if (!stats) {
    return <div className="alert alert-info">No statistics available</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Dashboard Analytics
          </h1>
          <p className="text-base-content/60 mt-1">Overview of your projects and tasks</p>
        </div>
        <button className="btn btn-primary btn-outline gap-2 shadow-md hover:shadow-lg transition-all" onClick={fetchStats}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
          </svg>
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl shadow-lg border border-primary/20 hover:shadow-xl transition-all duration-300">
          <div className="stat-figure text-primary opacity-20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-16 h-16 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <div className="stat-title text-base-content/70 font-medium">Total Projects</div>
          <div className="stat-value text-primary text-4xl">{stats.totalProjects}</div>
          <div className="stat-desc text-base-content/50">Active projects</div>
        </div>
        <div className="stat bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl shadow-lg border border-secondary/20 hover:shadow-xl transition-all duration-300">
          <div className="stat-figure text-secondary opacity-20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-16 h-16 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
          </div>
          <div className="stat-title text-base-content/70 font-medium">Total Tasks</div>
          <div className="stat-value text-secondary text-4xl">{stats.totalTasks}</div>
          <div className="stat-desc text-base-content/50">All tasks</div>
        </div>
        <div className="stat bg-gradient-to-br from-success/10 to-success/5 rounded-2xl shadow-lg border border-success/20 hover:shadow-xl transition-all duration-300">
          <div className="stat-figure text-success opacity-20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-16 h-16 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="stat-title text-base-content/70 font-medium">Completed Tasks</div>
          <div className="stat-value text-success text-4xl">{stats.statusBreakdown?.Completed || 0}</div>
          <div className="stat-desc text-base-content/50">Finished tasks</div>
        </div>
      </div>

      {/* Task Status Breakdown */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-2">Tasks by Status</h2>
          <p className="text-base-content/60 mb-4">Distribution of tasks across different statuses</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="stat bg-gradient-to-br from-info/10 to-info/5 rounded-xl border border-info/20 shadow-md">
              <div className="stat-title text-base-content/70 font-medium">To Do</div>
              <div className="stat-value text-info text-3xl">{stats.statusBreakdown?.['To Do'] || 0}</div>
              <div className="stat-desc text-base-content/50">Pending tasks</div>
            </div>
            <div className="stat bg-gradient-to-br from-warning/10 to-warning/5 rounded-xl border border-warning/20 shadow-md">
              <div className="stat-title text-base-content/70 font-medium">In Progress</div>
              <div className="stat-value text-warning text-3xl">{stats.statusBreakdown?.['In Progress'] || 0}</div>
              <div className="stat-desc text-base-content/50">Active tasks</div>
            </div>
            <div className="stat bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/20 shadow-md">
              <div className="stat-title text-base-content/70 font-medium">Completed</div>
              <div className="stat-value text-success text-3xl">{stats.statusBreakdown?.Completed || 0}</div>
              <div className="stat-desc text-base-content/50">Finished tasks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks per Project */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-2">Tasks per Project</h2>
          <p className="text-base-content/60 mb-4">Task breakdown by project</p>
          {stats.tasksPerProject && stats.tasksPerProject.length > 0 ? (
            <div className="overflow-x-auto mt-4">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Total Tasks</th>
                    <th>To Do</th>
                    <th>In Progress</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.tasksPerProject.map((project, idx) => (
                    <tr key={project.projectId || idx}>
                      <td className="font-semibold">{project.projectName}</td>
                      <td>{project.totalTasks}</td>
                      <td>
                        <span className="badge badge-info">{project.toDo}</span>
                      </td>
                      <td>
                        <span className="badge badge-warning">{project.inProgress}</span>
                      </td>
                      <td>
                        <span className="badge badge-success">{project.completed}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No tasks found in any project</p>
          )}
        </div>
      </div>

      {/* Tasks by Team Member */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-2">Tasks Assigned to Team Members</h2>
          <p className="text-base-content/60 mb-4">Task distribution across team members</p>
          {stats.tasksByMember && stats.tasksByMember.length > 0 ? (
            <div className="overflow-x-auto mt-4">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Team Member</th>
                    <th>Role</th>
                    <th>Total Tasks</th>
                    <th>To Do</th>
                    <th>In Progress</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.tasksByMember.map((member, idx) => (
                    <tr key={member.memberId || idx}>
                      <td className="font-semibold">{member.memberName}</td>
                      <td>
                        <span className={`badge ${
                          member.memberRole === 'Admin' ? 'badge-error' :
                          member.memberRole === 'Project Manager' ? 'badge-warning' :
                          'badge-info'
                        }`}>
                          {member.memberRole}
                        </span>
                      </td>
                      <td>{member.totalTasks}</td>
                      <td>
                        <span className="badge badge-info">{member.toDo}</span>
                      </td>
                      <td>
                        <span className="badge badge-warning">{member.inProgress}</span>
                      </td>
                      <td>
                        <span className="badge badge-success">{member.completed}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No tasks assigned to team members</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Stats
