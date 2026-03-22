'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Open email client
    window.location.href = `mailto:idikudakarthik55@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
    
    setStatus('sent')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <main className="min-h-screen bg-white overflow-hidden">
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
              <span className="text-sm font-medium text-gray-700">Contact Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Let's start a
              <span className="text-yellow-500"> conversation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a question or feedback? We'd love to hear from you. 
              Reach out and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-black mb-8">Get in touch</h2>
              
              <div className="space-y-8">
                {/* Email */}
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-yellow-600">@</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Email</h3>
                    <a
                      href="mailto:idikudakarthik55@gmail.com"
                      className="text-gray-600 hover:text-yellow-600 transition-colors"
                    >
                      idikudakarthik55@gmail.com
                    </a>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-yellow-600">⏱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Response Time</h3>
                    <p className="text-gray-600">Usually within 24 hours</p>
                  </div>
                </div>

                {/* Support */}
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-yellow-600">?</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Support</h3>
                    <p className="text-gray-600">Check our FAQ for quick answers</p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="mt-12">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop"
                  alt="Contact us"
                  className="rounded-3xl shadow-xl"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-black mb-8">Send us a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-4 bg-black text-white font-semibold rounded-2xl hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
                  </button>

                  {status === 'sent' && (
                    <p className="text-green-600 text-center text-sm">
                      Your email client should open. If not, please email us directly.
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-black mb-4">Need quick answers?</h2>
            <p className="text-gray-600 mb-8">
              Check out our FAQ section for answers to commonly asked questions.
            </p>
            <a
              href="/faq"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium rounded-2xl hover:bg-yellow-500 transition-colors"
            >
              <span>View FAQ</span>
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
