'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, profile, loading, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/search', label: 'Find Leads' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-8 left-1/2 -translate-x-1/2 rounded-full z-40 transition-all duration-300 border ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-2xl border-white/20 w-[90%] max-w-5xl'
            : 'bg-transparent border-transparent w-full max-w-7xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img src="/logo.svg" alt="SmartLeadTool" className="w-10 h-10 rounded-xl" />
              <span className="text-xl font-bold text-black hidden sm:block">
                SmartLeadTool
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative ${
                    pathname === link.href
                      ? 'text-black'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-400"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-4">
                      {/* Credits Display */}
                      <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-xl">
                        <span className="text-sm text-gray-600">Credits:</span>
                        <span className="font-bold text-black">{profile?.credits || 0}</span>
                      </div>

                      {/* Profile Dropdown */}
                      <div className="relative group">
                        <button className="flex items-center gap-2">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt=""
                              className="w-10 h-10 rounded-xl border-2 border-transparent group-hover:border-yellow-400 transition-colors"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                              <span className="text-white font-medium">
                                {user.displayName?.[0] || 'U'}
                              </span>
                            </div>
                          )}
                        </button>

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                          <div className="w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-100">
                              <p className="font-semibold text-black truncate">{user.displayName}</p>
                              <p className="text-sm text-gray-500 truncate">{user.email}</p>
                            </div>
                            <div className="p-2">
                              <Link
                                href="/dashboard"
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 rounded-xl transition-colors"
                              >
                                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">D</span>
                                <span>Dashboard</span>
                              </Link>
                              <Link
                                href="/search"
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 rounded-xl transition-colors"
                              >
                                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">S</span>
                                <span>Find Leads</span>
                              </Link>
                              <Link
                                href="/pricing"
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 rounded-xl transition-colors"
                              >
                                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">P</span>
                                <span>Buy Credits</span>
                              </Link>
                              <hr className="my-2 border-gray-100" />
                              <button
                                onClick={() => signOut()}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 rounded-xl transition-colors"
                              >
                                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">×</span>
                                <span>Sign Out</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Link
                        href="/auth/signin"
                        className="hidden sm:block px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/signin"
                        className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-yellow-500 transition-colors"
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              >
                <motion.span
                  animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                  className="w-6 h-0.5 bg-black block"
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  className="w-6 h-0.5 bg-black block"
                />
                <motion.span
                  animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                  className="w-6 h-0.5 bg-black block"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-30 md:hidden"
          >
            <div className="bg-white border-b border-gray-100 shadow-lg">
              <div className="px-4 py-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                      pathname === link.href
                        ? 'bg-yellow-50 text-black'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {user && (
                  <>
                    <hr className="my-4 border-gray-100" />
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-lg font-medium text-gray-600 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <span className="text-gray-600">Credits</span>
                      <span className="font-bold text-black">{profile?.credits || 0}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
