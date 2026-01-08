import React, { useEffect } from 'react'
import './App.css'
import Intro from './components/Intro'
import About from './components/About'
import Objective from './components/Objective'
import Skills from './components/Skills'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Languages from './components/Languages'

function App() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15 });

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="cv-container">
      <div className="reveal"><Intro /></div>
      <div className="reveal" style={{transitionDelay: '80ms'}}><About /></div>
      <div className="reveal" style={{transitionDelay: '120ms'}}><Objective /></div>
      <div className="reveal" style={{transitionDelay: '160ms'}}><Skills /></div>
      <div className="reveal" style={{transitionDelay: '200ms'}}><Education /></div>
      <div className="reveal" style={{transitionDelay: '240ms'}}><Experience /></div>
      <div className="reveal" style={{transitionDelay: '280ms'}}><Projects /></div>
      <div className="reveal" style={{transitionDelay: '320ms'}}><Certificates /></div>
      <div className="reveal" style={{transitionDelay: '360ms'}}><Languages /></div>
      <footer id="contact" className="cv-footer">© {new Date().getFullYear()} Zeeshan Khan</footer>
    </main>
  )
}

export default App
