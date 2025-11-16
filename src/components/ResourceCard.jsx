import { ExternalLink } from 'lucide-react'
import { getTypeIcon, getTypeLabel, getYouTubeThumbnail, getYouTubeVideoId } from '../utils/helpers'
import './ResourceCard.css'

function ResourceCard({ resource, onClick }) {
  const youtubeId = getYouTubeVideoId(resource.url)
  const thumbnailUrl = youtubeId ? getYouTubeThumbnail(youtubeId) : null
  const Icon = getTypeIcon(resource.type)

  const handleCardClick = (e) => {
    // If clicking on the external link button, don't open URL
    if (e.target.closest('.view-link')) {
      return
    }
    // If resource has a URL, open it in new tab
    if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer')
    } else {
      // If no URL, open detail modal instead
      onClick()
    }
  }

  return (
    <div className="resource-card" onClick={handleCardClick}>
      <div className="card-header">
        <div className="card-type">
          <Icon size={18} />
          <span className="type-label">{getTypeLabel(resource.type)}</span>
        </div>
      </div>

      {(resource.image_url || thumbnailUrl) && (
        <img 
          src={resource.image_url || thumbnailUrl} 
          alt={resource.title} 
          className="card-thumbnail"
          onError={(e) => e.target.style.display = 'none'}
        />
      )}

      <div className="card-body">
        <h3 className="card-title">{resource.title}</h3>
        <p className="card-description">{resource.description}</p>

        {resource.tags && resource.tags.length > 0 && (
          <div className="tags-container">
            {resource.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="card-footer">
        <div className="card-meta">
          <span className="author">by {resource.author}</span>
          <span className="separator">•</span>
          <span className="date">{new Date(resource.date).toLocaleDateString()}</span>
        </div>
        {resource.url ? (
          <a 
            href={resource.url} 
            className="view-link"
            onClick={(e) => {
              e.stopPropagation()
              // Open in same tab when clicking the link icon
              window.location.href = resource.url
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} />
          </a>
        ) : (
          <button 
            className="view-link"
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
            title="View details"
          >
            <ExternalLink size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default ResourceCard

