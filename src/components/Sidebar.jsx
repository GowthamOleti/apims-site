import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { LayoutDashboard, Sparkles, Headphones, Book, FileText, Video, Wand2, Lightbulb } from 'lucide-react'
import './Sidebar.css'

const sidebarItems = [
  { id: 'all', label: 'All', icon: LayoutDashboard },
  { id: 'ui-finding', label: 'UI Findings', icon: Sparkles },
  { id: 'podcast', label: 'Podcasts', icon: Headphones },
  { id: 'book', label: 'Books', icon: Book },
  { id: 'article', label: 'Articles', icon: FileText },
  { id: 'video', label: 'Videos', icon: Video },
  { id: 'tool', label: 'Tools', icon: Wand2 },
  { id: 'inspiration', label: 'Inspiration', icon: Lightbulb },
]

function Sidebar({ activeFilter, onFilterChange, onAddClick, user, onLogout }) {
  const [profile, setProfile] = useState(null)

  // Load profile from database
  useEffect(() => {
    if (!user?.id) return

    const loadProfile = async () => {
      try {
        const profileRef = doc(db, 'profiles', user.id)
        const profileSnap = await getDoc(profileRef)
        
        if (profileSnap.exists()) {
          setProfile(profileSnap.data())
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      }
    }

    loadProfile()
  }, [user?.id])

  // Get avatar URL from multiple sources
  const getAvatarUrl = () => {
    // Try profile from database first
    if (profile?.avatar_url) return profile.avatar_url
    // Then try user metadata
    if (user?.user_metadata?.avatar_url) return user.user_metadata.avatar_url
    if (user?.user_metadata?.picture) return user.user_metadata.picture
    return null
  }

  const avatarUrl = getAvatarUrl()
  const userName = profile?.name || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0]
  const userEmail = user?.email || ''

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">District</h1>
      </div>
      
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          {sidebarItems.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`nav-item ${activeFilter === item.id ? 'active' : ''}`}
                onClick={() => onFilterChange(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="add-button" onClick={onAddClick}>
          <span>+</span>
          <span>Add Resource</span>
        </button>
        {user && (
          <div className="sidebar-user">
            <div className="user-info">
              <div className="user-avatar">
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt={userEmail}
                    onError={(e) => {
                      // If image fails to load, show initial instead
                      e.target.style.display = 'none'
                      const parent = e.target.parentElement
                      if (parent && !parent.querySelector('span')) {
                        const span = document.createElement('span')
                        span.textContent = userName?.charAt(0).toUpperCase() || userEmail?.charAt(0).toUpperCase() || '?'
                        parent.appendChild(span)
                      }
                    }}
                  />
                ) : (
                  <span>{userName?.charAt(0).toUpperCase() || userEmail?.charAt(0).toUpperCase() || '?'}</span>
                )}
              </div>
              <div className="user-details">
                <div className="user-name">{userName}</div>
                <div className="user-email">{userEmail}</div>
              </div>
            </div>
            <button className="logout-button" onClick={onLogout}>
              Sign out
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar

