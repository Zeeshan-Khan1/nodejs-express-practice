import React from 'react'

function Projects() {
  const projects = [
    {
      name: 'Blood Donor Network',
      description: 'A web platform to connect blood donors across Pakistan.',
    },
    {
      name: 'Gym Management System',
      description: 'Member registration and management using Node.js & MSSQL.',
    },
    {
      name: 'Sheen Warsak Super League Website',
      description: 'Local cricket league website with multiple seasons.',
    },
    {
      name: 'Calculator & Stopwatch Apps',
      description: 'Interactive JS-based mini tools.',
    },
  ]

  return (
    <section className="cv-section" id="projects">
      <h2>Projects</h2>
      <ul className="project-list">
        {projects.map((p) => (
          <li key={p.name} className="project-item">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Projects


