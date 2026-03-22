'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import toast from 'react-hot-toast'
import { 
  getUserStats,
  getUserPayments,
  type UserStats,
  type Payment
} from '@/lib/firebaseServices'

export default function SettingsPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [payments, setPayments] = useState<Payment[]>([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        setLoadingData(true)
        const [statsData, paymentsData] = await Promise.all([
          getUserStats(user.uid),
          getUserPayments(user.uid, 10)
        ])
        setStats(statsData)
        setPayments(paymentsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
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
          <p className="mt-4 text-gray-500 font-medium">Loading...</p>
        </motion.div>
      </div>
    )
  }

  if (!user) return null

  const displayUserData = profile || { credits: 0 }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-black">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-black mb-6">Profile</h2>
          <div className="flex items-center gap-6">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName || 'Profile'} 
                className="w-24 h-24 rounded-2xl object-cover border-2 border-gray-100"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-yellow-400 flex items-center justify-center">
                <span className="text-4xl font-bold text-black">
                  {user.displayName?.[0] || user.email?.[0] || 'U'}
                </span>
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-black">{user.displayName || 'User'}</h3>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400 mt-2">
                Member since {new Date(user.metadata?.creationTime || Date.now()).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-black mb-6">Account Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Available Credits</p>
              <p className="text-3xl font-bold text-black">{displayUserData.credits || 0}</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Total Leads</p>
              <p className="text-3xl font-bold text-black">{stats?.totalLeads || 0}</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Searches Made</p>
              <p className="text-3xl font-bold text-black">{stats?.totalSearches || 0}</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Payments</p>
              <p className="text-3xl font-bold text-black">{payments.length}</p>
            </div>
          </div>
        </div>

        {/* Subscription Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-black">Credits</h2>
            <Link
              href="/pricing"
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-xl hover:bg-yellow-500 transition-colors"
            >
              Buy More
            </Link>
          </div>
          <div className="p-5 bg-yellow-50 border border-yellow-100 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-black">Available Credits</p>
                <p className="text-sm text-gray-500 mt-1">Each credit reveals one lead contact</p>
              </div>
              <p className="text-4xl font-bold text-black">{displayUserData.credits || 0}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-black mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/search"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="font-medium text-black">Find New Leads</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/dashboard/leads"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="font-medium text-black">View My Leads</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium text-black">Buy Credits</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            {/* Refresh button removed as data syncs in real-time */}
          </div>
        </div>

        {/* Support */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-black mb-6">Support</h2>
          <div className="space-y-3">
            <Link
              href="/faq"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-black">Help and FAQ</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="mailto:support@smartleadtool.com"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-black">Contact Support</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
