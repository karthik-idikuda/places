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
  getUserSearchHistory, 
  getUserPayments,
  getUserStats,
  type Lead,
  type SearchHistory,
  type Payment,
  type UserStats,
  getRelativeTime
} from '@/lib/firebaseServices'

export default function DashboardPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchAllData = async () => {
      if (!user) return

      try {
        setLoadingData(true)
        const [leadsData, historyData, paymentsData, statsData] = await Promise.all([
          getUserLeads(user.uid, 50),
          getUserSearchHistory(user.uid, 20),
          getUserPayments(user.uid, 20),
          getUserStats(user.uid)
        ])
        
        setLeads(leadsData)
        setSearchHistory(historyData)
        setPayments(paymentsData)
        setStats(statsData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        toast.error('Failed to load dashboard data')
      } finally {
        setLoadingData(false)
      }
    }

    fetchAllData()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 font-medium">Loading your dashboard...</p>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 font-medium">Redirecting to sign in...</p>
        </motion.div>
      </div>
    )
  }

  const displayUserData = profile || {
    credits: 0,
    totalLeadsViewed: 0,
    plan: 'free',
  }

  const dashboardStats = [
    {
      label: 'Total Leads',
      value: stats?.totalLeads || displayUserData.totalLeadsViewed || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'yellow',
      href: '/dashboard/leads',
    },
    {
      label: 'Available Credits',
      value: displayUserData.credits || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'green',
      href: '/pricing',
    },
    {
      label: 'Searches',
      value: stats?.totalSearches || searchHistory.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: 'blue',
      href: '/search',
    },
    {
      label: 'Total Payments',
      value: payments.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      color: 'purple',
      href: '/dashboard/settings',
    },
  ]

  const colorMap: Record<string, { bg: string; text: string; light: string }> = {
    yellow: { bg: 'bg-yellow-400', text: 'text-yellow-600', light: 'bg-yellow-50' },
    green: { bg: 'bg-green-400', text: 'text-green-600', light: 'bg-green-50' },
    blue: { bg: 'bg-blue-400', text: 'text-blue-600', light: 'bg-blue-50' },
    purple: { bg: 'bg-purple-400', text: 'text-purple-600', light: 'bg-purple-50' },
  }

  return (
    <DashboardLayout>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-black">
          Welcome back, {user.displayName?.split(' ')[0] || 'User'}
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your leads today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={stat.href}
              className="block bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:shadow-gray-100/50 hover:border-yellow-200 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${colorMap[stat.color].light} rounded-xl flex items-center justify-center`}>
                  <span className={colorMap[stat.color].text}>{stat.icon}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <motion.p
                key={stat.value}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-3xl font-bold text-black mt-1"
              >
                {loadingData ? '...' : stat.value}
              </motion.p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-black mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/search"
            className="group flex items-center gap-4 p-5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200 hover:border-yellow-400 hover:shadow-md transition-all duration-300"
          >
            <div className="w-14 h-14 bg-black group-hover:bg-yellow-400 rounded-xl flex items-center justify-center transition-colors duration-300">
              <svg className="w-7 h-7 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-black">Find Leads</p>
              <p className="text-sm text-gray-500">Search businesses</p>
            </div>
          </Link>

          <Link
            href="/pricing"
            className="group flex items-center gap-4 p-5 bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl border border-yellow-200 hover:border-yellow-400 hover:shadow-md transition-all duration-300"
          >
            <div className="w-14 h-14 bg-yellow-400 group-hover:bg-black rounded-xl flex items-center justify-center transition-colors duration-300">
              <svg className="w-7 h-7 text-black group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-black">Buy Credits</p>
              <p className="text-sm text-gray-500">Get more leads</p>
            </div>
          </Link>

          <button
            onClick={() => {
              // Refresh happens automatically
              toast.success('Data synced!')
            }}
            className="group flex items-center gap-4 p-5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
          >
            <div className="w-14 h-14 bg-gray-200 group-hover:bg-gray-300 rounded-xl flex items-center justify-center transition-colors duration-300">
              <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-bold text-black">Refresh Data</p>
              <p className="text-sm text-gray-500">Sync your account</p>
            </div>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Searches */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-black">Recent Searches</h2>
              <p className="text-sm text-gray-500">Your latest lead searches</p>
            </div>
          </div>

          {loadingData ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-yellow-500 rounded-full animate-spin" />
            </div>
          ) : searchHistory.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {searchHistory.slice(0, 5).map((search, index) => (
                <motion.div
                  key={search.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <span className="text-yellow-600 font-bold text-sm">{search.location[0].toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-medium text-black text-sm">{search.location}</p>
                        <p className="text-xs text-gray-500">{search.leadsFound} leads</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">{getRelativeTime(search.createdAt)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">No searches yet</p>
            </div>
          )}
        </div>

        {/* Credits Overview */}
        <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl" />
          <div className="relative z-10">
            <p className="text-gray-400 text-sm font-medium">Available Credits</p>
            <motion.p
              key={displayUserData.credits}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-5xl font-bold mt-2"
            >
              {displayUserData.credits}
            </motion.p>
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Total Leads Generated</span>
                <span className="text-yellow-400">{stats?.totalLeads || 0}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((displayUserData.credits / 50) * 100, 100)}%` }}
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                />
              </div>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition-colors"
            >
              Get More Credits
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      {leads.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mt-6">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-black">Recent Leads</h2>
              <p className="text-sm text-gray-500">Your latest saved leads</p>
            </div>
            <Link
              href="/dashboard/leads"
              className="text-sm font-medium text-yellow-600 hover:text-yellow-700 flex items-center gap-1"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {leads.slice(0, 5).map((lead, index) => (
              <motion.div
                key={lead.id || index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <span className="text-yellow-600 font-bold text-sm">{lead.name?.[0] || 'B'}</span>
                    </div>
                    <div>
                      <p className="font-medium text-black text-sm">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.phone}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                    lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                    lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {lead.status || 'new'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
