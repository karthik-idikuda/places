'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is SmartLeadTool?',
        a: 'SmartLeadTool is a lead generation tool that helps you find businesses without websites. It sources data from Google Maps and provides you with business names, addresses, phone numbers, and other details so you can reach out and offer your services.',
      },
      {
        q: 'Who is this for?',
        a: 'SmartLeadTool is designed for web developers, digital marketers, SEO specialists, and agencies who want to find potential clients. If you offer services like website development, digital marketing, or local SEO, this tool is for you.',
      },
      {
        q: 'How does it work?',
        a: 'Simply enter a location (city, area, or address) and select a business category. Our system searches for businesses in that area and filters out those that already have websites, giving you a list of potential leads.',
      },
    ],
  },
  {
    category: 'Credits & Pricing',
    questions: [
      {
        q: 'What are credits?',
        a: 'Credits are our currency system. 1 Credit = 1 Lead revealed with full contact details. Searching is free - you only use credits when you reveal a lead\'s phone number and complete information.',
      },
      {
        q: 'How much does it cost?',
        a: 'We offer affordable credit packages: Starter Pack (10 credits) for ₹99, Growth Pack (50 credits) for ₹299, Professional Pack (100 credits) for ₹499, and Enterprise Pack (250 credits) for ₹999. The more credits you buy, the better the value per lead.',
      },
      {
        q: 'Do credits expire?',
        a: 'No, your credits NEVER expire. Once you purchase them, they remain in your account forever until you use them. There is no time limit.',
      },
      {
        q: 'Is there a subscription?',
        a: 'No, SmartLeadTool uses a simple pay-as-you-go credit system. There are NO subscriptions, NO recurring charges, and NO automatic renewals. You only pay when you choose to buy more credits.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major payment methods through Razorpay, including credit/debit cards, UPI, net banking, and popular wallets like Paytm, PhonePe, and Google Pay.',
      },
    ],
  },
  {
    category: 'Data & Leads',
    questions: [
      {
        q: 'Where does the data come from?',
        a: 'All our data is sourced from Google Maps, ensuring accuracy and reliability. We use the Google Places API to fetch real-time business information.',
      },
      {
        q: 'How accurate is the data?',
        a: 'Since we source directly from Google Maps, the data is highly accurate. However, business information can change, so we recommend verifying critical details before reaching out.',
      },
      {
        q: 'What information do I get for each lead?',
        a: 'Each lead includes the business name, address, phone number, Google Maps rating, total reviews, and business category. For businesses with websites, we also show the website URL.',
      },
      {
        q: 'How many leads can I search?',
        a: 'You can search unlimited times for FREE! Each search shows up to 20 business listings. You only use credits when you choose to reveal a lead\'s full contact details.',
      },
    ],
  },
  {
    category: 'Account & Support',
    questions: [
      {
        q: 'How do I sign up?',
        a: 'Simply click "Sign In" and use your Google account to sign up. It takes less than 10 seconds. After signing up, purchase credits to start revealing leads.',
      },
      {
        q: 'Can I request a refund?',
        a: 'No, all credit purchases are final and non-refundable. However, your credits never expire, so you can use them whenever you want. We recommend starting with the Starter Pack to try out the service.',
      },
      {
        q: 'What happens if I delete my account?',
        a: 'If you delete your account, any remaining credits will be forfeited. We recommend using all your credits before closing your account.',
      },
      {
        q: 'How do I contact support?',
        a: 'You can email us at idikudakarthik55@gmail.com. We typically respond within 24 hours.',
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
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
              <span className="text-sm font-medium text-gray-700">FAQ</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Frequently asked
              <span className="text-yellow-500"> questions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about SmartLeadTool, 
              credits, and how to get the most out of our platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center">
                  <span className="text-lg font-bold text-yellow-600">
                    {category.category.charAt(0)}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-black">{category.category}</h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const itemId = `${categoryIndex}-${index}`
                  const isOpen = openItems.includes(itemId)

                  return (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className="text-lg font-medium text-black pr-4">
                          {faq.q}
                        </span>
                        <div
                          className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        >
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 px-4 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-500/10 -skew-x-12" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Can't find the answer you're looking for? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-yellow-400 transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="mailto:idikudakarthik55@gmail.com"
                className="px-8 py-4 text-white font-semibold hover:text-yellow-400 transition-colors"
              >
                Email Support →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Start CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 rounded-3xl p-12 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-black mb-4">
                  Ready to get started?
                </h2>
                <p className="text-gray-600 mb-6">
                  Sign up and purchase credits to start finding leads. 
                  Affordable pricing starting at just ₹1.
                </p>
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium rounded-2xl hover:bg-yellow-500 transition-colors"
                >
                  <span>Get Started</span>
                  <span>→</span>
                </Link>
              </div>
              <div className="hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
                  alt="Get started"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
