import React from 'react'

function Intro() {
  return (
    <header className="cv-intro">
      <div className="intro__avatar">
        <img src="/profile.jpg" alt="Zeeshan Khan" />
      </div>
      <div className="intro__meta">
        <h1 className="intro__name">ZEESHAN KHAN</h1>
        <p className="intro__role">Full‑Stack Web Developer (Student)</p>
        <ul className="intro__contacts">
          <li><a href="mailto:zeeshan.saeed8323@gmail.com">zeeshan.saeed8323@gmail.com</a></li>
          <li><a href="tel:+923078323508">+92 307 8323508</a></li>
          <li><a target="_blank" rel="noreferrer" href="https://linkedin.com/in/zeeshan-khan-491653261">LinkedIn</a></li>
          <li><a target="_blank" rel="noreferrer" href="https://github.com/Zeeshan-Khan1">GitHub</a></li>
          <li>Lahore, Pakistan</li>
        </ul>
        <div className="intro__actions">
          <a className="btn" href="#projects">View Projects</a>
          <a className="btn btn--outline" href="#contact">Contact</a>
        </div>
      </div>
    </header>
  )
}

export default Intro


