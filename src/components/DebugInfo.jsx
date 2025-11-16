import { useState } from 'react'
import firebaseApp from '../lib/firebase'

function DebugInfo() {
  const [show, setShow] = useState(false)
  
  if (process.env.NODE_ENV === 'production') return null

  const isConfigured = !!firebaseApp

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 9999,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '12px',
      fontFamily: 'monospace',
      maxWidth: '300px',
      cursor: 'pointer'
    }} onClick={() => setShow(!show)}>
      {!show ? (
        <div>🔍 Debug: {isConfigured ? '✅ Firebase Configured' : '❌ Not Configured'}</div>
      ) : (
        <div>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Firebase Config:</div>
          <div style={{ marginBottom: '4px' }}>
            Status: {isConfigured ? '✅ Connected' : '❌ Not Connected'}
          </div>
          <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.7 }}>
            Click to toggle
          </div>
        </div>
      )}
    </div>
  )
}

export default DebugInfo

