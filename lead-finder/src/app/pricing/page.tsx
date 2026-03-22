'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { PRICING_PLANS, RAZORPAY_KEY_ID } from '@/lib/razorpay'
import { createPaymentRecord, updatePaymentStatus, createNotification, updateUserCredits } from '@/lib/firebaseServices'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import toast from 'react-hot-toast'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PricingPage() {
  const { user, profile } = useAuth()
  const router = useRouter()
  const [processing, setProcessing] = useState<string | null>(null)

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async (plan: typeof PRICING_PLANS[0]) => {
    if (!user) {
      router.push('/auth/signin')
      return
    }

    setProcessing(plan.id)
    const loadingToast = toast.loading('Preparing payment...')

    try {
      // Load Razorpay script first
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        throw new Error('Razorpay SDK failed to load')
      }

      // Create order
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: plan.price,
          planId: plan.id,
          userId: user.uid,
          userEmail: user.email,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create order')
      }

      const order = await response.json()
      console.log('Order created:', order)
      
      if (!order.orderId) {
        throw new Error('No order ID received')
      }

      // Save payment record (don't await - let it run in background)
      createPaymentRecord({
        userId: user.uid,
        orderId: order.orderId,
        amount: plan.price,
        currency: 'INR',
        credits: plan.leads,
        plan: plan.id,
        status: 'created',
      }).catch(err => console.error('Failed to save payment record:', err))

      toast.dismiss(loadingToast)

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'SmartLeadTool',
        description: `${plan.name} - ${plan.leads} Credits`,
        order_id: order.orderId,
        handler: async (paymentResponse: any) => {
          const verifyToast = toast.loading('Verifying payment...')
          try {
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                planId: plan.id,
                userId: user.uid,
                credits: plan.leads,
                amount: plan.price,
              }),
            })

            const verification = await verifyResponse.json()
            if (verification.success) {
              await updatePaymentStatus(
                paymentResponse.razorpay_order_id,
                paymentResponse.razorpay_payment_id,
                'paid',
                paymentResponse.razorpay_signature
              )
              
              await updateUserCredits(user.uid, plan.leads)
              
              await createNotification({
                userId: user.uid,
                title: 'Payment Successful',
                message: `You have received ${plan.leads} credits. Start finding leads now!`,
                type: 'success',
                link: '/search',
              })

              // Send purchase confirmation email
              if (user.email) {
                fetch('/api/email/send', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    to: user.email,
                    subject: `Payment Successful - ${plan.leads} Credits Added! ✅`,
                    type: 'purchase',
                    data: {
                      name: user.displayName || 'there',
                      credits: plan.leads,
                      amount: plan.price,
                      packageName: plan.name,
                      orderId: paymentResponse.razorpay_order_id,
                    }
                  }),
                }).catch(console.error)
              }

              // Auto-refresh via onSnapshot
              // await refreshUserData()
              toast.dismiss(verifyToast)
              toast.success(`Payment successful! ${plan.leads} credits added.`)
              setProcessing(null)
              router.push('/dashboard')
            } else {
              throw new Error('Payment verification failed')
            }
          } catch (error) {
            toast.dismiss(verifyToast)
            console.error('Payment verification error:', error)
            toast.error('Payment verification failed. Please contact support.')
            setProcessing(null)
          }
        },
        prefill: {
          email: user.email || '',
          name: user.displayName || '',
        },
        theme: {
          color: '#FACC15',
        },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled')
            setProcessing(null)
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      toast.dismiss(loadingToast)
      console.error('Payment error:', error)
      toast.error('Failed to initiate payment. Please try again.')
      setProcessing(null)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Back Button */}
      <div className="pt-24 pb-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Pricing Section - Matching Landing Page */}
      <section className="pt-8 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold mb-4">
              Pricing
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-black tracking-tight mb-4">
              Simple Pricing
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pay as you go. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.slice(0, 3).map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className={`relative bg-white rounded-3xl p-8 ${
                  plan.popular 
                    ? 'border-2 border-yellow-400 shadow-xl' 
                    : 'border border-gray-200 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-yellow-400 text-black text-sm font-bold rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-6xl font-bold text-black">₹{plan.price}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-center">
                  <span className="text-4xl font-bold text-black">{plan.leads}</span>
                  <span className="text-gray-600 ml-2 text-lg">Credits</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePayment(plan)}
                  disabled={processing === plan.id}
                  className={`block w-full py-4 text-center font-semibold rounded-full transition-all duration-300 disabled:opacity-50 ${
                    plan.popular
                      ? 'bg-yellow-400 text-black hover:bg-yellow-500 shadow-lg'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {processing === plan.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    `Get ${plan.leads} Credits`
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-12 text-sm">
            Credits never expire. One-time purchase.
          </p>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to find your next clients?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Buy credits and start finding leads today.
          </p>
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
