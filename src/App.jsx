import { useState, useEffect } from 'react'
import { auth, db } from './lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore'
import Login from './components/Login'
import Loading from './components/Loading'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ResourceGrid from './components/ResourceGrid'
import AddResourceModal from './components/AddResourceModal'
import DetailModal from './components/DetailModal'
import DebugInfo from './components/DebugInfo'
import './styles/App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedResource, setSelectedResource] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Check auth status on mount
  useEffect(() => {
    console.log('🔍 Initializing Firebase auth...')
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log('✅ User signed in:', firebaseUser.email)
        // Map Firebase user to app format
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          user_metadata: {
            name: firebaseUser.displayName,
            full_name: firebaseUser.displayName,
            picture: firebaseUser.photoURL,
            avatar_url: firebaseUser.photoURL,
          }
        }
        setUser(userData)
        setLoading(false)
        await upsertProfile(userData)
        loadResources()
      } else {
        console.log('❌ No user signed in')
        setUser(null)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const upsertProfile = async (user) => {
    try {
      const profileRef = doc(db, 'profiles', user.id)
      const profileData = {
        id: user.id,
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.displayName || user.email?.split('@')[0],
        email: user.email,
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || user.photoURL,
        updated_at: new Date().toISOString(),
      }
      
      // Use setDoc with merge to create or update
      await setDoc(profileRef, {
        ...profileData,
        created_at: profileData.created_at || new Date().toISOString(),
      }, { merge: true })
    } catch (error) {
      console.error('Error upserting profile:', error)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
    setResources([])
  }

  const openResourceDetail = (resource) => {
    setSelectedResource(resource)
    setShowDetailModal(true)
  }

  // Load resources when user is authenticated
  useEffect(() => {
    if (!user) {
      console.log('No user, skipping resource load')
      setResources([])
      return
    }

    console.log('User authenticated, setting up resources listener...')
    const unsubscribe = loadResources()
    
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [user])

  const loadResources = () => {
    try {
      console.log('Loading resources from Firestore...')
      const resourcesRef = collection(db, 'resources')
      const q = query(resourcesRef, orderBy('created_at', 'desc'))
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const resourcesData = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          resourcesData.push({
            id: doc.id,
            type: data.type,
            title: data.title,
            description: data.description || '',
            url: data.url || '',
            tags: data.tags || [],
            author: data.author_name || data.author || 'Unknown',
            date: data.created_at || new Date().toISOString(),
            image_url: data.image_url || null,
          })
        })
        console.log('Resources loaded:', resourcesData.length)
        setResources(resourcesData)
      }, (error) => {
        console.error('Error loading resources:', error)
        setResources([])
      })
      
      return unsubscribe
    } catch (error) {
      console.error('Error setting up resources listener:', error)
      setResources([])
    }
  }

  const handleAddResource = async (newResource) => {
    if (!user) {
      alert('You must be signed in to add resources')
      return
    }

    try {
      console.log('Adding resource to Firestore:', {
        type: newResource.type,
        title: newResource.title,
        created_by: user.id,
      })

      const resourceData = {
        type: newResource.type,
        title: newResource.title,
        description: newResource.description || '',
        url: newResource.url || '',
        tags: newResource.tags || [],
        author_name: user?.user_metadata?.name || user?.displayName || user?.email?.split('@')[0] || newResource.author || 'Unknown',
        image_url: newResource.image_url || null,
        created_by: user.id,
        created_at: new Date().toISOString(),
      }

      await addDoc(collection(db, 'resources'), resourceData)
      console.log('Resource added successfully')
      setShowAddModal(false)
    } catch (error) {
      console.error('Error adding resource:', error)
      alert(`Failed to add resource: ${error.message}\n\nCheck browser console (F12) for details.`)
    }
  }

  const handleUpdateResource = async (updatedResource) => {
    if (!user) {
      alert('You must be signed in to update resources')
      return
    }

    try {
      const resourceRef = doc(db, 'resources', updatedResource.id)
      await updateDoc(resourceRef, {
        type: updatedResource.type,
        title: updatedResource.title,
        description: updatedResource.description,
        url: updatedResource.url,
        tags: updatedResource.tags,
        image_url: updatedResource.image_url || null,
      })
      setShowDetailModal(false)
      setSelectedResource(null)
    } catch (error) {
      console.error('Error updating resource:', error)
      alert(`Failed to update resource: ${error.message}`)
    }
  }

  const handleDeleteResource = async (id) => {
    if (!user) {
      alert('You must be signed in to delete resources')
      return
    }

    if (!confirm('Are you sure you want to delete this resource?')) {
      return
    }

    try {
      const resourceRef = doc(db, 'resources', id)
      await deleteDoc(resourceRef)
      setShowDetailModal(false)
      setSelectedResource(null)
    } catch (error) {
      console.error('Error deleting resource:', error)
      alert(`Failed to delete resource: ${error.message}`)
    }
  }

  // Filter and search
  const filteredResources = resources.filter(resource => {
    const matchesFilter = activeFilter === 'all' || resource.type === activeFilter
    const query = searchQuery.toLowerCase()
    const matchesSearch = !query || 
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query) ||
      resource.author.toLowerCase().includes(query) ||
      resource.tags.some(tag => tag.toLowerCase().includes(query))
    return matchesFilter && matchesSearch
  })

  // Show login if not authenticated
  if (loading) {
    return <Loading />
  }

  if (!user) {
    return <Login onLogin={setUser} />
  }

  return (
    <div className="app-wrapper">
      <DebugInfo />
      <Sidebar 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onAddClick={() => setShowAddModal(true)}
        user={user}
        onLogout={handleLogout}
      />
      <div className="main-content">
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          user={user}
          onLogout={handleLogout}
        />
        <ResourceGrid 
          resources={filteredResources}
          onResourceClick={openResourceDetail}
        />
      </div>

      {showAddModal && (
        <AddResourceModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddResource}
          user={user}
        />
      )}

      {showDetailModal && selectedResource && (
        <DetailModal
          resource={selectedResource}
          onClose={() => {
            setShowDetailModal(false)
            setSelectedResource(null)
          }}
          onUpdate={handleUpdateResource}
          onDelete={handleDeleteResource}
        />
      )}
    </div>
  )
}

export default App

