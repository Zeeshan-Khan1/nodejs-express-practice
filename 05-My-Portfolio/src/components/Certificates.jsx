import React from 'react'

function Certificates() {
  const items = [
    'Talent Quest Competition (Tech Innovation)',
    'Code Clash Competition',
    'Introduction to Graph Theory and Database',
    'Web Development Competition (UMT)'
  ]

  return (
    <section className="cv-section" id="certificates">
      <h2>Certificates</h2>
      <ul>
        {items.map(c => <li key={c}>{c}</li>)}
      </ul>
    </section>
  )
}

export default Certificates


