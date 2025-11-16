import { Sparkles, Headphones, Book, FileText, Video, Wand2, Lightbulb } from 'lucide-react'

export function getTypeIcon(type) {
  const icons = {
    'ui-finding': Sparkles,
    'podcast': Headphones,
    'book': Book,
    'article': FileText,
    'video': Video,
    'tool': Wand2,
    'inspiration': Lightbulb,
  }
  return icons[type] || FileText
}

export function getTypeLabel(type) {
  const labels = {
    'ui-finding': 'UI Finding',
    'podcast': 'Podcast',
    'book': 'Book',
    'article': 'Article',
    'video': 'Video',
    'tool': 'Tool',
    'inspiration': 'Inspiration',
  }
  return labels[type] || 'Resource'
}

export function getYouTubeVideoId(url) {
  if (!url) return null
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  
  return null
}

export function getYouTubeThumbnail(videoId) {
  if (!videoId) return null
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

