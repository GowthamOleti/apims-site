import './Loading.css'

function Loading({ isFadingOut = false }) {
  return (
    <div className={`loading-container ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo-wrapper">
          <img
            src="/apims-logo.png"
            alt="APIMS Logo"
            className="loading-logo"
          />
          <div className="loading-ring"></div>
          <div className="loading-ring-ring2"></div>
          <div className="loading-ring-ring3"></div>
        </div>
        <div className="loading-text">
          <span className="loading-dot">Loading</span>
          <span className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Loading

