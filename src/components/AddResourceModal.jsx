import { X, Upload, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'
import { storage } from '../lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
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

function AddResourceModal({ onClose, onAdd, user }) {
  const [formData, setFormData] = useState({
    type: 'ui-finding',
    title: '',
    description: '',
    url: '',
    tags: '',
    author: 'Design Team',
    image_url: '',
  })
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const resource = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
    }

    onAdd(resource)
    setFormData({
      type: 'ui-finding',
      title: '',
      description: '',
      url: '',
      tags: '',
      author: 'Design Team',
      image_url: '',
    })
    setImagePreview(null)
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleImageUpload = async (event) => {
    try {
      setUploading(true)
      const file = event.target.files?.[0]
      if (!file) return

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)

      // Upload to Firebase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${user?.id || 'anonymous'}-${Date.now()}.${fileExt}`
      const storageRef = ref(storage, `ui-findings/${user?.id || 'anonymous'}/${fileName}`)

      // Upload file
      const snapshot = await uploadBytes(storageRef, file)
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref)
      
      setFormData({ ...formData, image_url: downloadURL })
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
      setImagePreview(null)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setFormData({ ...formData, image_url: '' })
    setImagePreview(null)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Resource</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Type</label>
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                required
              >
                {resourceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter resource title"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe the resource..."
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://..."
              />
            </div>

            {formData.type === 'ui-finding' && (
              <div className="form-group">
                <label>Image (optional)</label>
                {imagePreview || formData.image_url ? (
                  <div className="image-upload-preview">
                    <img src={imagePreview || formData.image_url} alt="Preview" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="remove-image-btn"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="image-upload-label">
                    <Upload size={18} />
                    <span>{uploading ? 'Uploading...' : 'Choose Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
                {uploading && <div className="upload-progress">Uploading image...</div>}
              </div>
            )}

            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="design, ux, inspiration"
              />
            </div>

            <div className="form-group">
              <label>Author *</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddResourceModal

