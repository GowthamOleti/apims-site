import { X, Edit2, Trash2, Save, XCircle } from 'lucide-react'
import { useState } from 'react'
import './Modal.css'

const resourceTypes = [
  { value: 'ui-finding', label: 'UI Finding' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'book', label: 'Book' },
  { value: 'article', label: 'Article' },
  { value: 'video', label: 'Video' },
  { value: 'tool', label: 'Tool' },
  { value: 'inspiration', label: 'Inspiration' },
]

function DetailModal({ resource, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    type: resource.type || '',
    title: resource.title || '',
    description: resource.description || '',
    url: resource.url || '',
    tags: (resource.tags || []).join(', ') || '',
    image_url: resource.image_url || '',
  })

  const handleSave = () => {
    const updated = {
      ...resource,
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      image_url: formData.image_url || resource.image_url || null,
    }
    onUpdate(updated)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      onDelete(resource.id)
    }
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Resource Details</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Type</label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              disabled={!isEditing}
            >
              {resourceTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows="4"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => handleChange('url', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {resource.type === 'ui-finding' && formData.image_url && (
            <div className="form-group">
              <label>Image</label>
              <div className="image-upload-preview">
                <img src={formData.image_url} alt={resource.title} />
              </div>
              {isEditing && (
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => handleChange('image_url', e.target.value)}
                  placeholder="Image URL or upload new image"
                />
              )}
            </div>
          )}

          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              placeholder="tag1, tag2, tag3"
              disabled={!isEditing}
            />
          </div>

          <div className="resource-meta">
            <span>by {resource.author || 'Unknown'}</span>
            <span className="separator">•</span>
            <span>{new Date(resource.date || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="modal-actions">
          {!isEditing ? (
            <>
              <button
                className="btn-secondary"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                <Trash2 size={16} />
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-secondary"
                onClick={() => {
                  setIsEditing(false)
                  setFormData({
                    type: resource.type || '',
                    title: resource.title || '',
                    description: resource.description || '',
                    url: resource.url || '',
                    tags: (resource.tags || []).join(', ') || '',
                    image_url: resource.image_url || '',
                  })
                }}
              >
                <XCircle size={16} />
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSave}>
                <Save size={16} />
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailModal

