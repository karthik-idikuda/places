'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import toast from 'react-hot-toast'
import { 
  getUserLeads, 
  type Lead,
  getRelativeTime
} from '@/lib/firebaseServices'

export default function MyLeadsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchLeads = async () => {
      if (!user) return

      try {
        setLoadingData(true)
        const leadsData = await getUserLeads(user.uid, 100)
        setLeads(leadsData)
      } catch (error) {
        console.error('Error fetching leads:', error)
        toast.error('Failed to load leads')
      } finally {
        setLoadingData(false)
      }
    }

    fetchLeads()
  }, [user])

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus
    const matchesSearch = searchQuery === '' || 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.category?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">My Leads</h1>
            <p className="text-gray-500 text-sm mt-1">Manage and track your saved leads</p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-black text-white font-medium rounded-xl hover:bg-yellow-500 transition-colors"
          >
            Find More Leads
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search leads by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'new', 'contacted', 'converted'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${
                    filterStatus === status
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500 mb-1">Total Leads</p>
            <p className="text-2xl font-bold text-black">{leads.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500 mb-1">New</p>
            <p className="text-2xl font-bold text-blue-600">
              {leads.filter(l => l.status === 'new').length}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500 mb-1">Contacted</p>
            <p className="text-2xl font-bold text-yellow-600">
              {leads.filter(l => l.status === 'contacted').length}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500 mb-1">Converted</p>
            <p className="text-2xl font-bold text-green-600">
              {leads.filter(l => l.status === 'converted').length}
            </p>
          </div>
        </div>

        {/* Leads List */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-black">
              {filterStatus === 'all' ? 'All Leads' : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Leads`}
            </h2>
            <p className="text-sm text-gray-500">{filteredLeads.length} leads found</p>
          </div>

          {loadingData ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-yellow-500 rounded-full animate-spin" />
            </div>
          ) : filteredLeads.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {filteredLeads.map((lead, index) => (
                <motion.div
                  key={lead.id || index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-yellow-600">
                          {lead.name?.[0] || 'B'}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-black truncate">{lead.name}</h3>
                        <p className="text-sm text-gray-500 truncate">{lead.address}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                            >
                              {lead.phone}
                            </a>
                          )}
                          {lead.category && (
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                              {lead.category}
                            </span>
                          )}
                          {lead.rating && (
                            <span className="text-sm text-gray-500">
                              {lead.rating} rating
                            </span>
                          )}
                          {lead.website && (
                            <a
                              href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Website
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-lg ${
                        lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                        lead.status === 'converted' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {lead.status || 'new'}
                      </span>
                      <p className="text-xs text-gray-400 mt-2">
                        {getRelativeTime(lead.createdAt)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">
                {searchQuery || filterStatus !== 'all' ? 'No leads match your filters' : 'No leads saved yet'}
              </p>
              <Link
                href="/search"
                className="inline-block mt-4 px-6 py-3 bg-black text-white font-medium rounded-xl hover:bg-yellow-500 transition-colors"
              >
                Start Finding Leads
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
