import React from 'react'

function Skills() {
  const skillGroups = [
    { title: 'Frontend', items: ['HTML5', 'CSS', 'Bootstrap', 'JavaScript'] },
    { title: 'Backend', items: ['Node.js', 'Express.js'] },
    { title: 'Database', items: ['Microsoft SQL Server (MSSQL)'] },
    { title: 'DevOps Tools', items: ['Linux', 'Docker', 'Git', 'GitHub', 'Kubernetes'] },
    { title: 'Cloud (AWS)', items: ['VPC', 'EC2', 'S3'] },
    { title: 'Other', items: ['REST APIs', 'Responsive Design'] },
  ]

  return (
    <section className="cv-section" id="skills">
      <h2>Professional Skills</h2>
      <div className="skills">
        {skillGroups.map(group => (
          <div className="skill-group" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills


