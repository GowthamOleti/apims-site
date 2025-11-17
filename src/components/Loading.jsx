import './Loading.css'

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-logo-wrapper">
        <img 
          src="/apims-logo.png" 
          alt="APIMS Logo" 
          className="loading-logo"
        />
        <div className="loading-pulse"></div>
      </div>
    </div>
  )
}

export default Loading

