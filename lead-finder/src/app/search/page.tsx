'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import toast from 'react-hot-toast'
import { 
  saveLead, 
  saveSearchHistory, 
  updateUserCredits,
  createNotification 
} from '@/lib/firebaseServices'

interface Place {
  place_id: string
  name: string
  formatted_address?: string
  formatted_phone_number?: string
  rating?: number
  user_ratings_total?: number
  types?: string[]
  website?: string
  business_status?: string
  opening_hours?: {
    open_now?: boolean
  }
}

const CATEGORIES = [
  { name: 'Restaurants', query: 'restaurant', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=150&fit=crop' },
  { name: 'Retail Stores', query: 'retail store', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=150&fit=crop' },
  { name: 'Cafes', query: 'cafe', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=150&fit=crop' },
  { name: 'Beauty Salons', query: 'beauty salon', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=150&fit=crop' },
  { name: 'Gyms', query: 'gym fitness', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=150&fit=crop' },
  { name: 'Auto Repair', query: 'auto repair', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=200&h=150&fit=crop' },
  { name: 'Dentists', query: 'dentist', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=200&h=150&fit=crop' },
  { name: 'Lawyers', query: 'lawyer attorney', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=150&fit=crop' },
  { name: 'Plumbers', query: 'plumber', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=200&h=150&fit=crop' },
  { name: 'Electricians', query: 'electrician', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&h=150&fit=crop' },
  { name: 'Pet Services', query: 'pet grooming veterinary', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=150&fit=crop' },
  { name: 'Real Estate', query: 'real estate agent', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=150&fit=crop' },
  { name: 'Bakeries', query: 'bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=150&fit=crop' },
  { name: 'Florists', query: 'florist', image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=200&h=150&fit=crop' },
  { name: 'Photography', query: 'photographer studio', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=200&h=150&fit=crop' },
  { name: 'Tutoring', query: 'tutoring education', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=150&fit=crop' },
  { name: 'Cleaning', query: 'cleaning service', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=150&fit=crop' },
  { name: 'Construction', query: 'construction contractor', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=150&fit=crop' },
  { name: 'Hotels', query: 'hotel lodging', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop' },
  { name: 'Event Venues', query: 'event venue', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&h=150&fit=crop' },
]

export default function SearchPage() {
  const { user, profile, loading, consumeCredit, logSearch, logLeadView } = useAuth()
  const router = useRouter()

  const [location, setLocation] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [places, setPlaces] = useState<Place[]>([])
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([])
  const [searching, setSearching] = useState(false)
  const [revealedPlaces, setRevealedPlaces] = useState<Set<string>>(new Set())
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedLead, setSelectedLead] = useState<Place | null>(null)
  const [generatingPitch, setGeneratingPitch] = useState(false)
  const [salesPitch, setSalesPitch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // AI Smart Search
  const [aiSearchQuery, setAiSearchQuery] = useState('')
  const [searchMode, setSearchMode] = useState<'normal' | 'ai'>('ai')
  const [aiAnalysis, setAiAnalysis] = useState<{
    businessType?: string
    location?: string
    characteristics?: string[]
    googlePlacesType?: string
    targetDescription?: string
  } | null>(null)

  // Location autocomplete
  const [locationSuggestions, setLocationSuggestions] = useState<Array<{
    description: string
    place_id: string
    structured_formatting?: {
      main_text: string
      secondary_text: string
    }
  }>>([])
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [detectingLocation, setDetectingLocation] = useState(false)

  // Auto-detect location on mount
  useEffect(() => {
    if (!loading && user && !location) {
      detectUserLocation()
    }
  }, [loading, user])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  // Detect user location using Geolocation API with IP fallback
  const detectUserLocation = async () => {
    setDetectingLocation(true)
    
    // First try browser geolocation
    if ("geolocation" in navigator) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            enableHighAccuracy: false
          })
        })
        
        const { latitude, longitude } = position.coords
        // Reverse geocode to get city name
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
        const data = await response.json()
        
        if (data.results && data.results[0]) {
          // Find city/locality in address components
          const addressComponents = data.results[0].address_components
          const cityComponent = addressComponents.find((c: any) => c.types.includes('locality') || c.types.includes('administrative_area_level_2'))
          const regionComponent = addressComponents.find((c: any) => c.types.includes('administrative_area_level_1'))
          
          if (cityComponent) {
            const cityName = cityComponent.long_name
            const regionName = regionComponent ? regionComponent.short_name : ''
            const fullLoc = regionName ? `${cityName}, ${regionName}` : cityName
            setLocation(fullLoc)
            toast.success(`Location detected: ${cityName}`)
            setDetectingLocation(false)
            return
          }
        }
      } catch (error) {
        console.log('Browser geolocation failed or denied, falling back to IP')
      }
    }

    // Fallback to IP detection
    try {
      const response = await fetch('/api/location')
      const data = await response.json()
      if (data.city) {
        const detectedLocation = data.city + (data.region ? `, ${data.region}` : '') + (data.country ? `, ${data.country}` : '')
        setLocation(detectedLocation)
        toast.success(`Location detected: ${data.city}`)
      }
    } catch (error) {
      console.log('Could not detect location')
      toast.error('Could not detect location. Please type it manually.')
    } finally {
      setDetectingLocation(false)
    }
  }

  // Fetch location suggestions
  const fetchLocationSuggestions = async (input: string) => {
    if (input.length < 2) {
      setLocationSuggestions([])
      return
    }
    try {
      const response = await fetch(`/api/location/autocomplete?input=${encodeURIComponent(input)}`)
      const data = await response.json()
      if (data.predictions) {
        setLocationSuggestions(data.predictions)
        setShowLocationSuggestions(true)
      }
    } catch (error) {
      console.log('Autocomplete error')
    }
  }

  // Handle location input change with debounce
  const handleLocationChange = (value: string) => {
    setLocation(value)
    // Debounce the autocomplete request
    const timeoutId = setTimeout(() => {
      fetchLocationSuggestions(value)
    }, 300)
    return () => clearTimeout(timeoutId)
  }

  // Select a location suggestion
  const selectLocationSuggestion = (suggestion: typeof locationSuggestions[0]) => {
    setLocation(suggestion.description)
    setShowLocationSuggestions(false)
    setLocationSuggestions([])
  }

  // AI-powered smart search
  const smartSearch = async () => {
    if (!aiSearchQuery.trim()) {
      toast.error('Please describe what leads you are looking for')
      return
    }

    if (!profile || profile.credits < 1) {
      toast.error('You need credits to search. Please buy credits first.')
      router.push('/pricing')
      return
    }

    setSearching(true)
    setPlaces([])
    setFilteredPlaces([])
    setAiAnalysis(null)

    try {
      const loadingToast = toast.loading('🤖 AI is analyzing your request...')

      // Step 1: Analyze query with AI
      const aiResponse = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: aiSearchQuery })
      })
      const aiData = await aiResponse.json()
      
      setAiAnalysis(aiData)
      toast.dismiss(loadingToast)
      
      const searchToast = toast.loading(`Searching for ${aiData.businessType || 'businesses'}...`)

      // Step 2: Search Google Places with AI-extracted keywords
      const searchLocation = aiData.location || location || 'India'
      const searchType = aiData.googlePlacesType || aiData.businessType || 'business'
      
      const response = await fetch(
        `/api/places?location=${encodeURIComponent(searchLocation)}&type=${encodeURIComponent(searchType)}`
      )
      const data = await response.json()

      if (data.error) {
        toast.dismiss(searchToast)
        toast.error('Search failed: ' + data.error)
        setSearching(false)
        return
      }

      const allPlaces: Place[] = []
      
      if (data.results) {
        // Get details for each place
        for (const place of data.results.slice(0, 15)) {
          try {
            const detailsResponse = await fetch(
              `/api/places/details?place_id=${place.place_id}`
            )
            const detailsData = await detailsResponse.json()
            if (detailsData.result) {
              allPlaces.push(detailsData.result)
            }
          } catch (e) {
            console.log('Failed to get details for', place.name)
          }
        }
      }

      // Apply AI-recommended filters
      let filteredResults = allPlaces
      const characteristics = aiData.characteristics || []
      
      // Filter based on characteristics
      const needsNoWebsite = characteristics.some((c: string) => 
        c.toLowerCase().includes('no website') || 
        c.toLowerCase().includes('no_website') || 
        c.toLowerCase().includes('without website')
      )
      
      const needsLowRatings = characteristics.some((c: string) => 
        c.toLowerCase().includes('low rating') || 
        c.toLowerCase().includes('poor review') || 
        c.toLowerCase().includes('bad rating') ||
        c.toLowerCase().includes('poor rating')
      )

      if (needsNoWebsite) {
        filteredResults = filteredResults.filter(p => !p.website)
      }
      
      if (needsLowRatings) {
        filteredResults = filteredResults.filter(p => !p.rating || p.rating < 4)
      }
      
      // If the query was general and didn't specify these, don't over-filter, 
      // but maybe prefer results with phone numbers for leads
      if (!needsNoWebsite && !needsLowRatings) {
        // Just ensure they have a phone number so they are actually "leads"
        filteredResults = filteredResults.filter(p => p.formatted_phone_number)
      }

      setPlaces(allPlaces)
      setFilteredPlaces(filteredResults)

      toast.dismiss(searchToast)
      
      if (filteredResults.length > 0) {
        toast.success(`🎯 Found ${filteredResults.length} potential leads!`)
      } else {
        toast.error('No matching leads found. Try a different search.')
      }

      // Log search
      await logSearch(aiSearchQuery, searchLocation)

    } catch (error) {
      console.error('Smart search error:', error)
      toast.error('Search failed. Please try again.')
    } finally {
      setSearching(false)
    }
  }

  const toggleCategory = (query: string) => {
    setSelectedCategories((prev) =>
      prev.includes(query)
        ? prev.filter((c) => c !== query)
        : prev.length < 5
        ? [...prev, query]
        : prev
    )
  }

  const searchPlaces = async () => {
    if (!location.trim()) {
      setErrorMessage('Please enter a location')
      toast.error('Please enter a location')
      return
    }
    if (selectedCategories.length === 0) {
      setErrorMessage('Please select at least one category')
      toast.error('Please select at least one category')
      return
    }

    // Check if user has credits
    if (!profile || profile.credits < 1) {
      toast.error('You need credits to search. Please buy credits first.')
      router.push('/pricing')
      return
    }

    setErrorMessage('')
    setSearching(true)
    setPlaces([])
    setFilteredPlaces([])

    try {
      const allPlaces: Place[] = []
      const loadingToast = toast.loading('Searching for leads...')

      for (const category of selectedCategories) {
        const response = await fetch(
          `/api/places?location=${encodeURIComponent(location)}&type=${encodeURIComponent(category)}`
        )
        const data = await response.json()

        if (data.error) {
          console.error('API error:', data.error)
          continue
        }

        if (data.results) {
          for (const place of data.results.slice(0, 10)) {
            const detailsResponse = await fetch(
              `/api/places/details?place_id=${place.place_id}`
            )
            const detailsData = await detailsResponse.json()

            if (detailsData.result) {
              allPlaces.push(detailsData.result)
            }
          }
        }
      }

      // Remove duplicates
      const uniquePlaces = allPlaces.filter(
        (place, index, self) =>
          index === self.findIndex((p) => p.place_id === place.place_id)
      )

      setPlaces(uniquePlaces)
      // Show all unique places as potential leads, don't restrict only to "no website" 
      // as per user request to see all relevant lead info
      const potentialLeads = uniquePlaces.filter(p => p.formatted_phone_number)
      setFilteredPlaces(potentialLeads)

      // Log search
      await logSearch(selectedCategories.join(', '), location)
      
      toast.dismiss(loadingToast)
      
      if (potentialLeads.length > 0) {
        toast.success(`Found ${potentialLeads.length} potential leads!`)
      } else {
        toast.error('No potential leads found in this area')
      }
    } catch (error) {
      console.error('Search error:', error)
      setErrorMessage('Search failed. Please try again.')
      toast.error('Search failed. Please try again.')
    } finally {
      setSearching(false)
    }
  }

  const revealLead = async (place: Place) => {
    if (!user || !profile) return

    if (profile.credits < 1) {
      toast.error('No credits remaining. Please buy more.')
      router.push('/pricing')
      return
    }

    if (revealedPlaces.has(place.place_id)) return

    try {
      // FIRST: Fetch place details to get phone number
      const detailsRes = await fetch(`/api/places/details?placeId=${place.place_id}`)
      const detailsData = await detailsRes.json()
      
      if (detailsData.result) {
        // Update the place object with fetched details
        const details = detailsData.result
        place.formatted_phone_number = details.formatted_phone_number || details.international_phone_number || 'Not available'
        place.formatted_address = details.formatted_address || place.formatted_address
        place.website = details.website || place.website
        
        // Update places array with the new details
        setPlaces(prevPlaces => 
          prevPlaces.map(p => 
            p.place_id === place.place_id 
              ? { ...p, formatted_phone_number: place.formatted_phone_number, formatted_address: place.formatted_address, website: place.website }
              : p
          )
        )
      }

      // Try to deduct credit
      const success = await consumeCredit()
      if (!success) {
        toast.error('Failed to deduct credit')
        return
      }
      
      // Try to save lead to Firebase
      try {
        await saveLead({
          userId: user.uid,
          name: place.name,
          phone: place.formatted_phone_number || '',
          address: place.formatted_address || '',
          category: place.types?.[0] || 'business',
          rating: place.rating,
          totalRatings: place.user_ratings_total,
          placeId: place.place_id,
          hasWebsite: !!place.website,
          website: place.website,
          searchQuery: selectedCategories.join(', '),
          searchLocation: location,
          status: 'new',
        })
        await logLeadView()
      } catch (e) {
        console.log('Firebase offline, lead saved locally')
      }

      // Always update local state - this makes the UI responsive
      setRevealedPlaces((prev) => new Set(Array.from(prev).concat([place.place_id])))
      
      toast.success(`Contact revealed for ${place.name}`)
    } catch (error) {
      console.error('Error revealing lead:', error)
      toast.error('Failed to reveal lead. Please try again.')
    }
  }

  const exportToCSV = () => {
    const revealed = filteredPlaces.filter((p) => revealedPlaces.has(p.place_id))
    if (revealed.length === 0) {
      toast.error('No revealed leads to export')
      return
    }

    const headers = ['Name', 'Phone', 'Address', 'Rating', 'Reviews']
    const rows = revealed.map((p) => [
      p.name,
      p.formatted_phone_number || '',
      p.formatted_address || '',
      p.rating?.toString() || '',
      p.user_ratings_total?.toString() || '',
    ])

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${location}-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    toast.success(`Exported ${revealed.length} leads to CSV`)
  }

  const generateSalesPitch = async (place: Place) => {
    setSelectedLead(place)
    setGeneratingPitch(true)
    setSalesPitch('')

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const pitch = `Hi,

I noticed that ${place.name} doesn't have a website yet, and I wanted to reach out because I help local businesses like yours get more customers online.

A professional website can help you:
• Appear in Google searches when people look for ${place.types?.[0]?.replace(/_/g, ' ') || 'businesses'} nearby
• Showcase your services and build credibility
• Let customers contact you 24/7

I'd love to create a simple, effective website for ${place.name} that brings in more customers.

Would you be open to a quick 10-minute call this week to discuss?

Best regards`

    setSalesPitch(pitch)
    setGeneratingPitch(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 font-medium">Loading...</p>
        </motion.div>
      </div>
    )
  }

  if (!user) return null

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black">Find Leads</h1>
            <p className="text-gray-500 mt-1">
              Discover businesses without websites in any location
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-yellow-50 rounded-xl flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-600">Credits:</span>
              <span className="text-lg font-bold text-black">{profile?.credits || 0}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-4 flex gap-2"
      >
        <button
          onClick={() => setSearchMode('ai')}
          className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
            searchMode === 'ai'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI Smart Search
        </button>
        <button
          onClick={() => setSearchMode('normal')}
          className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
            searchMode === 'normal'
              ? 'bg-black text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Manual Search
        </button>
      </motion.div>

      {/* AI Smart Search Form */}
      {searchMode === 'ai' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6 mb-8 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-black">AI-Powered Lead Search</h3>
              <p className="text-sm text-gray-500">Describe what leads you want in plain English</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🎯 What kind of leads are you looking for?
              </label>
              <textarea
                value={aiSearchQuery}
                onChange={(e) => setAiSearchQuery(e.target.value)}
                placeholder="Example: cafes in Mumbai that don't have a website, restaurants with low ratings that need marketing help, salons without branding..."
                className="w-full px-4 py-4 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 text-lg transition-all resize-none"
                rows={3}
              />
            </div>
            
            {/* Optional Location Override with Autocomplete */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Location (optional - AI will detect from your query)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onFocus={() => location.length >= 2 && setShowLocationSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                  placeholder="Type city name... (e.g., Hyder for Hyderabad)"
                  className="w-full pl-10 pr-24 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <button
                  type="button"
                  onClick={detectUserLocation}
                  disabled={detectingLocation}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-200 transition-all flex items-center gap-1"
                >
                  {detectingLocation ? (
                    <div className="w-3 h-3 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
                  ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  Auto-detect
                </button>
              </div>
              
              {/* Location Suggestions Dropdown */}
              {showLocationSuggestions && locationSuggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {locationSuggestions.map((suggestion, index) => (
                    <button
                      key={suggestion.place_id || index}
                      type="button"
                      onClick={() => selectLocationSuggestion(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
                    >
                      <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">
                          {suggestion.structured_formatting?.main_text || suggestion.description.split(',')[0]}
                        </p>
                        <p className="text-sm text-gray-500">
                          {suggestion.structured_formatting?.secondary_text || suggestion.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={smartSearch}
              disabled={searching}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-purple-500/30"
            >
              {searching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>AI is searching...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Find Leads with AI</span>
                </>
              )}
            </button>

            {/* AI Analysis Display */}
            {aiAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white rounded-xl border border-purple-100"
              >
                <p className="text-sm font-medium text-purple-600 mb-2">🤖 AI Analysis:</p>
                <div className="flex flex-wrap gap-2">
                  {aiAnalysis.businessType && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {aiAnalysis.businessType}
                    </span>
                  )}
                  {aiAnalysis.location && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      📍 {aiAnalysis.location}
                    </span>
                  )}
                  {aiAnalysis.characteristics?.map((char, i) => (
                    <span key={i} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                      {char}
                    </span>
                  ))}
                </div>
                {aiAnalysis.targetDescription && (
                  <p className="text-sm text-gray-600 mt-2">{aiAnalysis.targetDescription}</p>
                )}
              </motion.div>
            )}

            {/* Example Queries */}
            <div className="pt-2">
              <p className="text-xs text-gray-500 mb-2">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'cafes in Mumbai without website',
                  'restaurants with low ratings in Delhi',
                  'beauty salons that need marketing help',
                  'gyms in Bangalore without branding'
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => setAiSearchQuery(example)}
                    className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm hover:border-purple-400 hover:text-purple-600 transition-all"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Normal Search Form */}
      {searchMode === 'normal' && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm"
      >
        <div className="grid lg:grid-cols-4 gap-4 items-end">
          {/* Location Input with Autocomplete */}
          <div className="lg:col-span-2 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
                onFocus={() => location.length >= 2 && setShowLocationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                placeholder="Type city name... (e.g., Hyder for Hyderabad)"
                className="w-full pl-12 pr-28 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 text-lg transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <button
                type="button"
                onClick={detectUserLocation}
                disabled={detectingLocation}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-xs font-medium hover:bg-yellow-200 transition-all flex items-center gap-1"
              >
                {detectingLocation ? (
                  <div className="w-3 h-3 border-2 border-yellow-400 border-t-yellow-700 rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                )}
                Auto
              </button>
            </div>
            
            {/* Location Suggestions Dropdown */}
            {showLocationSuggestions && locationSuggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                {locationSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.place_id || index}
                    type="button"
                    onClick={() => selectLocationSuggestion(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-yellow-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
                  >
                    <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">
                        {suggestion.structured_formatting?.main_text || suggestion.description.split(',')[0]}
                      </p>
                      <p className="text-sm text-gray-500">
                        {suggestion.structured_formatting?.secondary_text || suggestion.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Categories Display */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories ({selectedCategories.length}/5)
            </label>
            <button
              onClick={() => setShowCategoryModal(true)}
              className="w-full py-4 px-4 bg-gray-50 border border-gray-200 rounded-xl text-left hover:border-yellow-400 transition-all flex items-center justify-between"
            >
              <span className={selectedCategories.length > 0 ? 'text-black' : 'text-gray-400'}>
                {selectedCategories.length > 0
                  ? `${selectedCategories.length} selected`
                  : 'Select categories'}
              </span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Search Button */}
          <button
            onClick={searchPlaces}
            disabled={searching}
            className="py-4 px-8 bg-black text-white font-semibold rounded-xl hover:bg-yellow-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-black/20 hover:shadow-yellow-500/30"
          >
            {searching ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Category Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.slice(0, 10).map((cat) => (
            <motion.button
              key={cat.query}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleCategory(cat.query)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategories.includes(cat.query)
                  ? 'bg-yellow-400 text-black shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </motion.button>
          ))}
          <button
            onClick={() => setShowCategoryModal(true)}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-all"
          >
            + More
          </button>
        </div>

        {errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-red-600 text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {errorMessage}
          </motion.p>
        )}
      </motion.div>
      )}

      {/* Results Section */}
      {filteredPlaces.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-black flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-lg">
                  <span className="text-yellow-600 font-bold text-sm">{filteredPlaces.length}</span>
                </span>
                Leads Found
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Businesses without websites in {location}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
              
              <button
                onClick={exportToCSV}
                disabled={revealedPlaces.size === 0}
                className="px-5 py-2.5 bg-black text-white font-medium rounded-xl hover:bg-yellow-500 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export ({revealedPlaces.size})
              </button>
            </div>
          </div>

          {/* Lead Cards Grid */}
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredPlaces.map((place, index) => {
              const isRevealed = revealedPlaces.has(place.place_id)

              return (
                <motion.div
                  key={place.place_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 ${
                    viewMode === 'list' ? 'flex items-stretch' : ''
                  }`}
                >
                  {/* Card Header with Image Placeholder */}
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-32'} bg-gradient-to-br from-gray-100 to-gray-200`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-300">{place.name?.[0] || 'B'}</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-lg shadow-lg">
                        No Website
                      </span>
                    </div>
                    {isRevealed && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Revealed
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1">
                    {/* Business Name */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-yellow-600 font-bold text-lg">
                          {place.name[0].toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-black truncate">{place.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {place.types?.[0]?.replace(/_/g, ' ')}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    {place.rating && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(place.rating!)
                                  ? 'text-yellow-400'
                                  : 'text-gray-200'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-black">{place.rating}</span>
                        <span className="text-sm text-gray-400">({place.user_ratings_total})</span>
                      </div>
                    )}

                    {/* Contact Info */}
                    {isRevealed ? (
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                          <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="font-semibold text-green-800">{place.formatted_phone_number}</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                          <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm text-gray-600 leading-snug">{place.formatted_address}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-xl mb-4 text-center border border-dashed border-gray-200">
                        <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <p className="text-gray-500 text-sm font-medium">Contact Hidden</p>
                        <p className="text-xs text-gray-400 mt-1">Use 1 credit to unlock</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      {isRevealed ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => generateSalesPitch(place)}
                          className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/30"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          AI Pitch
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => revealLead(place)}
                          className="flex-1 py-3 bg-black text-white font-semibold rounded-xl hover:bg-yellow-500 hover:text-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/20"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                          Reveal (1 Credit)
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!searching && places.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="w-32 h-32 bg-yellow-50 rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
            <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-4 border-yellow-200 rounded-3xl"
            />
          </div>
          <h3 className="text-2xl font-bold text-black mb-2">
            Start Your Search
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Enter a location and select up to 5 categories to discover businesses without websites
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['New York', 'Los Angeles', 'Chicago', 'Houston'].map((city) => (
              <button
                key={city}
                onClick={() => setLocation(city)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Category Modal */}
      <AnimatePresence>
        {showCategoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowCategoryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-black">
                      Select Categories
                    </h2>
                    <p className="text-gray-500 mt-1">
                      Choose up to 5 categories ({selectedCategories.length}/5 selected)
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowCategoryModal(false)}
                    className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {CATEGORIES.map((cat) => (
                    <motion.button
                      key={cat.query}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleCategory(cat.query)}
                      className={`relative overflow-hidden rounded-2xl transition-all ${
                        selectedCategories.includes(cat.query)
                          ? 'ring-3 ring-yellow-400 shadow-lg shadow-yellow-400/30'
                          : 'hover:shadow-md'
                      }`}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-28 object-cover"
                      />
                      <div className={`absolute inset-0 flex flex-col items-center justify-center ${
                        selectedCategories.includes(cat.query)
                          ? 'bg-yellow-500/90'
                          : 'bg-black/60 hover:bg-black/70'
                      } transition-all`}>
                        <span className="text-white font-medium text-sm">{cat.name}</span>
                      </div>
                      {selectedCategories.includes(cat.query) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between gap-4">
                  {selectedCategories.length > 0 && (
                    <button
                      onClick={() => setSelectedCategories([])}
                      className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCategoryModal(false)}
                    className="ml-auto px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-yellow-500 hover:text-black transition-all shadow-lg"
                  >
                    Apply Selection
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sales Pitch Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => {
              setSelectedLead(null)
              setSalesPitch('')
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-yellow-100/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-black">
                        AI Sales Pitch
                      </h2>
                      <p className="text-sm text-gray-500">{selectedLead.name}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSelectedLead(null)
                      setSalesPitch('')
                    }}
                    className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              <div className="p-6">
                {generatingPitch ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-400">AI</span>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-500 font-medium">Generating personalized pitch...</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm leading-relaxed">
                      {salesPitch}
                    </pre>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedLead(null)
                    setSalesPitch('')
                  }}
                  className="flex-1 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  Close
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigator.clipboard.writeText(salesPitch)
                    toast.success('Sales pitch copied to clipboard!')
                  }}
                  disabled={generatingPitch}
                  className="flex-1 py-4 bg-black text-white font-semibold rounded-xl hover:bg-yellow-500 hover:text-black transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Pitch
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}
