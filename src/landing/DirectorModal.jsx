import { useState, useEffect } from 'react'
import './directorModal.css'

function DirectorModal({ director, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  if (!director) return null

  return (
    <div className={`modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
      <div className={`modal-content ${isVisible ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-header">
          <div className="modal-avatar">
            <div className="modal-avatar-inner">{director.initials}</div>
          </div>
          <h2 className="modal-name">{director.name}</h2>
          <p className="modal-title">{director.role}</p>
        </div>

        <div className="modal-body">
          {director.summary && (
            <div className="modal-section">
              <h3 className="modal-section-title">Profile Summary</h3>
              <p className="modal-text">{director.summary}</p>
            </div>
          )}

          {director.journey && (
            <div className="modal-section">
              <h3 className="modal-section-title">Professional Journey</h3>
              {director.journey.map((item, index) => (
                <div key={index} className="modal-timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    {item.period && <span className="timeline-period">{item.period}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {director.education && (
            <div className="modal-section">
              <h3 className="modal-section-title">Education</h3>
              <div className="modal-list">
                {director.education.map((item, index) => (
                  <div key={index} className="modal-list-item">
                    <span className="list-icon">🎓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {director.achievements && (
            <div className="modal-section">
              <h3 className="modal-section-title">Key Achievements</h3>
              <div className="modal-list">
                {director.achievements.map((item, index) => (
                  <div key={index} className="modal-list-item">
                    <span className="list-icon">⭐</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {director.appointments && (
            <div className="modal-section">
              <h3 className="modal-section-title">Key Appointments</h3>
              <div className="modal-list">
                {director.appointments.map((item, index) => (
                  <div key={index} className="modal-list-item">
                    <span className="list-icon">📍</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {director.vision && (
            <div className="modal-section modal-highlight">
              <h3 className="modal-section-title">Vision & Impact</h3>
              <p className="modal-text">{director.vision}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DirectorModal

