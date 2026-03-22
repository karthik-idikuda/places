'use client'

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { PRICING_PLANS } from '@/lib/razorpay'

// 3D Card Component with tilt effect
const Card3D = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setRotateX((y - centerY) / 10)
    setRotateY((centerX - x) / 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`${className} transition-transform duration-200`}
    >
      {children}
    </motion.div>
  )
}

// Parallax Image Component
const ParallaxImage = ({ src, alt, className = '' }: { src: string; alt: string; className?: string }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <motion.div ref={ref} style={{ y }} className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  )
}

// Animated Counter
const AnimatedCounter = ({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 2000
      const increment = end / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, end])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

// Floating Element
const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    animate={{
      y: [0, -15, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      repeatType: 'reverse',
      delay,
    }}
  >
    {children}
  </motion.div>
)

export default function HomePage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Smooth parallax values
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <main className="min-h-screen bg-white overflow-hidden" ref={containerRef}>
      {/* Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-red-400 origin-left z-50"
      />

      <Navbar />

      {/* Hero Section with 3D Elements */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-8">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-red-700">Find High-Quality Business Leads</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-6">
                  Discover businesses
                  <span className="block text-red-500">without websites</span>
                </h1>

                <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                  Connect with local businesses that need your services. Get verified contact information directly from Google Maps.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link
                    href="/auth/signin"
                    className="group px-8 py-4 bg-black text-white font-semibold rounded-2xl hover:bg-red-600 transition-all duration-300 text-center"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Start Finding Leads
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </Link>
                  <Link
                    href="/pricing"
                    className="px-8 py-4 border-2 border-gray-200 text-black font-semibold rounded-2xl hover:border-black transition-colors text-center"
                  >
                    View Pricing
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-3xl font-bold text-black">
                      <AnimatedCounter end={195} suffix="+" />
                    </p>
                    <p className="text-sm text-gray-500">Countries</p>
                  </div>
                  <div className="w-px h-12 bg-gray-200" />
                  <div>
                    <p className="text-3xl font-bold text-black">
                      <AnimatedCounter end={50} suffix="+" />
                    </p>
                    <p className="text-sm text-gray-500">Categories</p>
                  </div>
                  <div className="w-px h-12 bg-gray-200" />
                  <div>
                    <p className="text-3xl font-bold text-black">
                      <AnimatedCounter end={100} suffix="%" />
                    </p>
                    <p className="text-sm text-gray-500">Verified Data</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - 3D Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="hidden lg:block"
              >
                <FloatingElement>
                  <Card3D className="relative">
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                      {/* Mock Dashboard */}
                      <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl">
                          <span className="text-gray-400">Search location...</span>
                        </div>
                      </div>
                      
                      {/* Lead Cards */}
                      <div className="p-6 space-y-4">
                        {[
                          { name: 'Fresh Bakes Cafe', type: 'Restaurant', rating: 4.8, status: 'No Website' },
                          { name: 'City Auto Repairs', type: 'Automotive', rating: 4.5, status: 'No Website' },
                          { name: 'Green Thumb Gardens', type: 'Landscaping', rating: 4.9, status: 'No Website' },
                        ].map((lead, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.2 }}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <span className="text-red-600 font-bold">{lead.name[0]}</span>
                              </div>
                              <div>
                                <p className="font-semibold text-black">{lead.name}</p>
                                <p className="text-sm text-gray-500">{lead.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-black">{lead.rating} ★</p>
                              <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                                {lead.status}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card3D>
                </FloatingElement>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-red-500 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section with Parallax */}
      <section className="py-32 px-4 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-50 -skew-x-12 transform origin-top-right" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black mt-4 mb-6">
              Everything you need to
              <span className="block">find quality leads</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Global Coverage',
                description: 'Search for businesses in any city or country. Access data from over 195 countries worldwide.',
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
              },
              {
                title: 'Verified Phone Numbers',
                description: 'Get direct contact information sourced from Google Maps. Reach decision makers instantly.',
                image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=300&fit=crop',
              },
              {
                title: 'No Website Filter',
                description: 'Automatically identify businesses without websites. Perfect for web developers and agencies.',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
              },
              {
                title: 'Export to CSV',
                description: 'Download your leads in CSV format. Import directly into your CRM or email tools.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
              },
              {
                title: 'AI Sales Pitch',
                description: 'Generate personalized outreach messages for each lead using AI technology.',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
              },
              {
                title: 'Real-time Data',
                description: 'Fresh data pulled directly from Google Maps. Always up-to-date information.',
                image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card3D>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Horizontal Scroll Effect */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black mt-4">
              How it works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Location',
                description: 'Enter any city, state, or country where you want to find leads',
                color: 'bg-red-50 text-red-600',
              },
              {
                step: '02',
                title: 'Select Category',
                description: 'Pick from 50+ business categories like restaurants, retail, services',
                color: 'bg-red-100 text-red-700',
              },
              {
                step: '03',
                title: 'Filter Results',
                description: 'View businesses without websites that need your services',
                color: 'bg-red-200 text-red-800',
              },
              {
                step: '04',
                title: 'Get Contacts',
                description: 'Reveal phone numbers and export leads to CSV instantly',
                color: 'bg-red-300 text-red-900',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-red-100 -translate-x-1/2 z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className={`w-32 h-32 ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl font-bold`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof Section */}
      <section className="py-32 px-4 bg-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">Results</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Built for professionals
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join web developers, digital marketers, and agencies who use LeadFinderPro to grow their business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Web Developers',
                description: 'Find local businesses that need a professional website. Offer your development services to businesses missing online presence.',
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
              },
              {
                title: 'Digital Marketers',
                description: 'Discover businesses needing SEO, social media, and online marketing. Build your client base with qualified leads.',
                image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop',
              },
              {
                title: 'Agencies',
                description: 'Scale your lead generation effortlessly. Export bulk leads and integrate with your existing CRM workflow.',
                image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&h=300&fit=crop',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card3D>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-4 bg-red-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black mt-4 mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No subscriptions. No hidden fees. Pay only for the leads you need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING_PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card3D>
                  <div className={`relative p-8 rounded-3xl h-full ${
                    plan.popular
                      ? 'bg-black text-white'
                      : 'bg-white border border-gray-200'
                  }`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="px-4 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-black'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm mb-6 ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                      {plan.description}
                    </p>
                    
                    <div className="mb-6">
                      <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-black'}`}>
                        ₹{plan.price}
                      </span>
                      <span className={plan.popular ? 'text-gray-400' : 'text-gray-500'}> / {plan.leads} leads</span>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className={`flex items-center gap-2 text-sm ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${plan.popular ? 'bg-red-400' : 'bg-red-500'}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      href="/pricing"
                      className={`block w-full py-3 text-center font-semibold rounded-xl transition-colors ${
                        plan.popular
                          ? 'bg-white text-black hover:bg-gray-100'
                          : 'bg-black text-white hover:bg-red-600'
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Ready to find your
              <span className="text-red-500"> next clients?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Start with 3 free credits. No credit card required. 
              Find businesses that need your services today.
            </p>
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white font-semibold rounded-2xl hover:bg-red-600 transition-colors text-lg"
            >
              Get Started Free
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
