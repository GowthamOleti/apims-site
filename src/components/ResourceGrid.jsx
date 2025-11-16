import ResourceCard from './ResourceCard'
import './ResourceGrid.css'

function ResourceGrid({ resources, onResourceClick }) {
  if (resources.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <h2 className="empty-title">No resources found</h2>
        <p className="empty-description">Start by adding your first design resource.</p>
      </div>
    )
  }

  return (
    <div className="resource-grid">
      {resources.map(resource => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onClick={() => onResourceClick(resource)}
        />
      ))}
    </div>
  )
}

export default ResourceGrid

