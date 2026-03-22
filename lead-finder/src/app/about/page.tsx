'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <main className="min-h-screen bg-white overflow-hidden" ref={containerRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="absolute inset-0 bg-yellow-50 opacity-50" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-8">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span className="text-sm font-medium text-gray-700">About Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Helping businesses find
              <span className="text-yellow-500"> their next customer</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              SmartLeadTool is a powerful tool designed to help web developers, 
              digital marketers, and agencies find businesses that need their services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              style={{ y: y2 }}
              className="order-2 lg:order-1"
            >
              <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="text-4xl font-bold text-black mt-4 mb-6">
                Connecting service providers with businesses in need
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Millions of businesses around the world still don't have an online presence. 
                They're missing out on customers, credibility, and growth opportunities. 
                At the same time, talented developers and marketers struggle to find clients.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We built SmartLeadTool to bridge this gap. Our platform helps you discover 
                businesses without websites, complete with verified contact information, 
                so you can reach out and offer your services.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium rounded-2xl hover:bg-yellow-500 transition-colors"
              >
                <span>Start Finding Leads</span>
                <span>→</span>
              </Link>
            </motion.div>

            <motion.div
              style={{ y: y1 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop"
                  alt="Team collaboration"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-3xl font-bold text-black">100+</p>
                      <p className="text-sm text-gray-500">Cities</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-black">50+</p>
                      <p className="text-sm text-gray-500">Categories</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-500/5 -skew-x-12 transform origin-top-right" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="text-4xl font-bold text-white mt-4">
              What we stand for
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Data Quality',
                description: 'We source all our data from Google Maps, ensuring accuracy and reliability. Every lead comes with verified business information.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
              },
              {
                title: 'User Focus',
                description: 'Our platform is designed to be simple and effective. No complicated dashboards or unnecessary features. Just the leads you need.',
                image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
              },
              {
                title: 'Fair Pricing',
                description: 'We believe in transparent, affordable pricing. Pay only for the leads you use, with no hidden fees or subscriptions.',
                image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="text-4xl font-bold text-black mt-4">
              Simple and effective
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Choose Location', description: 'Search for any city or area worldwide' },
              { step: '02', title: 'Select Category', description: 'Pick from 50+ business categories' },
              { step: '03', title: 'Get Leads', description: 'Receive businesses without websites' },
              { step: '04', title: 'Reach Out', description: 'Contact leads with verified phone numbers' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-yellow-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-yellow-600">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="py-20 px-4 bg-yellow-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wider">
              The Creator
            </span>
            <h2 className="text-4xl font-bold text-black mt-4 mb-6">
              Built by Karthik Idikuda
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              SmartLeadTool was created to solve a real problem faced by freelancers 
              and agencies looking for clients. Instead of cold outreach to random businesses, 
              now you can find the exact businesses that need your help.
            </p>
            <a
              href="mailto:idikudakarthik55@gmail.com"
              className="inline-flex items-center gap-2 text-black font-medium hover:text-yellow-600 transition-colors"
            >
              <span>Get in touch</span>
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-500/10 -skew-x-12" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to find your next clients?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Buy credits and start finding leads today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/auth/signin"
                  className="px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-yellow-400 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="/pricing"
                  className="px-8 py-4 text-white font-semibold hover:text-yellow-400 transition-colors"
                >
                  View Pricing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
