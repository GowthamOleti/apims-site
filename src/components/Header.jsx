import { Search } from 'lucide-react'
import './Header.css'

const categoryLabels = {
  'all': 'All Resources',
  'ui-finding': 'UI Findings',
  'podcast': 'Podcasts',
  'book': 'Books',
  'article': 'Articles',
  'video': 'Videos',
  'tool': 'Tools',
  'inspiration': 'Inspiration',
}

function Header({ searchQuery, onSearchChange, activeFilter, user, onLogout }) {
  return (
    <header className="header">
      <div className="header-left">
        <img
          src="/apims-logo.png"
          alt="APIMS Logo"
          className="apims-logo"
        />
        <h1 className="page-title">{categoryLabels[activeFilter] || 'All Resources'}</h1>
      </div>
      <div className="header-right">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </header>
  )
}

export default Header

