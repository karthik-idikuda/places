'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function SignInPage() {
  const { user, loading, signInWithGoogle } = useAuth()
  const router = useRouter()
  const [isSigningIn, setIsSigningIn] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  const handleSignIn = async () => {
    setIsSigningIn(true)
    try {
      await signInWithGoogle()
      toast.success('Welcome back! Redirecting to dashboard...')
      router.push('/dashboard')
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error('Sign in failed. Please try again.')
    } finally {
      setIsSigningIn(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-100 border-t-yellow-500 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return null
  }

  const features = [
    {
      title: 'Verified Leads',
      description: 'Real phone numbers for local businesses',
    },
    {
      title: 'Smart Filtering',
      description: 'Find businesses without websites',
    },
    {
      title: 'Export Data',
      description: 'Download leads as CSV files',
    },
    {
      title: 'AI Pitches',
      description: 'Generate personalized sales messages',
    },
  ]

  const stats = [
    { value: '20+', label: 'Categories' },
    { value: '100+', label: 'Cities Covered' },
    { value: '24/7', label: 'Access' },
  ]

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Sign In Form */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-12 relative">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-md mx-auto w-full"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-12">
              <img 
                src="/logo.svg" 
                alt="SmartLeadTool" 
                className="w-14 h-14"
              />
              <div>
                <span className="text-2xl font-bold text-black">
                  SmartLeadTool
                </span>
                <p className="text-xs text-gray-500">Find Local Leads Fast</p>
              </div>
            </Link>

            {/* Welcome Text */}
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Welcome back
              </h1>
              <p className="text-lg text-gray-600">
                Sign in to access your dashboard and find high-quality leads for your business.
              </p>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="w-full py-5 px-6 bg-white border-2 border-gray-200 rounded-2xl font-medium text-black hover:border-yellow-400 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSigningIn ? (
                <>
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-yellow-500 rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>

            {/* Terms */}
            <p className="mt-6 text-sm text-gray-500 text-center">
              By signing in, you agree to our{' '}
              <Link href="/legal/terms" className="text-black hover:text-yellow-600 underline transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/legal/privacy" className="text-black hover:text-yellow-600 underline transition-colors">
                Privacy Policy
              </Link>
            </p>

            {/* Features Grid */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">What you&apos;ll get</p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-black text-sm">{feature.title}</p>
                      <p className="text-xs text-gray-500">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Hero Image */}
        <div className="hidden lg:block relative bg-black overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=1600&fit=crop"
              alt="Business Dashboard"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-yellow-900/30" />

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-[150px] opacity-10" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-16">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-white/80">Find leads in any location</span>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                Find businesses
                <br />
                <span className="text-yellow-400">without websites</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-md">
                Get access to high-quality leads with verified phone numbers. 
                Perfect for web developers, digital marketers, and agencies.
              </p>

              {/* Feature List */}
              <div className="space-y-4 mb-12">
                {[
                  'Verified Contact Information',
                  'Filter By Website Status',
                  'Export to CSV',
                  'AI Sales Pitch Generator',
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-black font-bold">
                      ✓
                    </span>
                    <span className="text-white text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-center"
                  >
                    <p className="text-4xl font-bold text-yellow-400">{stat.value}</p>
                    <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Get started in seconds</p>
                  <p className="text-gray-400 text-sm">Sign in with Google to begin</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
