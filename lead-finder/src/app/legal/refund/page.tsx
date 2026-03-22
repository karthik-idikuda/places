'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="SmartLeadTool" className="w-10 h-10 rounded-xl" />
            <span className="text-xl font-bold text-black">SmartLeadTool</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">Refund & Cancellation Policy</h1>
              <p className="text-gray-500">Last updated: February 5, 2026</p>
            </div>

            <div className="prose prose-lg max-w-none">
              {/* Important Notice Box */}
              <section className="mb-10">
                <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-red-700 m-0">No Refunds Policy</h2>
                      <p className="text-red-600 m-0">All credit purchases are final and non-refundable</p>
                    </div>
                  </div>
                  <p className="text-red-700 mt-4">
                    Due to the nature of our digital service, <strong>all credit purchases are final and non-refundable</strong>. 
                    Once credits are added to your account, no refunds will be issued under any circumstances.
                  </p>
                </div>
              </section>

              {/* Introduction */}
              <section className="mb-10">
                <p className="text-gray-600 text-lg leading-relaxed">
                  SmartLeadTool operates on a credit-based system. You purchase credits, and each credit allows you to reveal 
                  one business lead with complete contact information. Please read this policy carefully before making a purchase.
                </p>
              </section>

              {/* Section 1 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">1. Credit Purchase Terms</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  By purchasing credits on SmartLeadTool, you acknowledge and agree to the following:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-xl">
                    <h4 className="font-semibold text-black mb-2">Non-Refundable</h4>
                    <p className="text-gray-700">All credit purchases are final and non-refundable. No refunds will be issued for any reason, including but not limited to unused credits, account closure, or dissatisfaction with the service.</p>
                  </div>
                  
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                    <h4 className="font-semibold text-green-800 mb-2">Credits Never Expire</h4>
                    <p className="text-green-700">Your purchased credits will remain in your account indefinitely. There is no expiration date on credits - use them whenever you want.</p>
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                    <h4 className="font-semibold text-blue-800 mb-2">Account Cancellation</h4>
                    <p className="text-blue-700">If you choose to delete or deactivate your account, your remaining credits will be forfeited. No refunds will be provided for unused credits upon account closure.</p>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                    <h4 className="font-semibold text-yellow-800 mb-2">One-Time Purchases</h4>
                    <p className="text-yellow-700">SmartLeadTool uses a pay-as-you-go credit system. There are no subscriptions, no recurring charges, and no automatic renewals. You only pay when you choose to buy credits.</p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">2. How Our Credit System Works</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Understanding our simple credit-based system:
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left p-4 font-semibold text-black">Action</th>
                        <th className="text-left p-4 font-semibold text-black">Credits Used</th>
                        <th className="text-left p-4 font-semibold text-black">What You Get</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 text-gray-600">Reveal a Lead</td>
                        <td className="p-4 text-gray-600 font-bold">1 Credit</td>
                        <td className="p-4 text-gray-600">Business name, phone number, address, category</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 text-gray-600">Search for Businesses</td>
                        <td className="p-4 text-gray-600 font-bold">0 Credits</td>
                        <td className="p-4 text-gray-600">Free - browse as many search results as you want</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 text-gray-600">Export Leads</td>
                        <td className="p-4 text-gray-600 font-bold">0 Credits</td>
                        <td className="p-4 text-gray-600">Free - export already revealed leads anytime</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-gray-600">View Saved Leads</td>
                        <td className="p-4 text-gray-600 font-bold">0 Credits</td>
                        <td className="p-4 text-gray-600">Free - access your saved leads forever</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 3 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">3. Situations Where No Refund Applies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To be absolutely clear, refunds will NOT be granted in the following situations:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                    <p className="text-red-700">Unused credits in your account</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                    <p className="text-red-700">Dissatisfaction with lead quality or data accuracy</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                    <p className="text-red-700">Accidental or mistaken purchases</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                    <p className="text-red-700">Account termination or deletion (self-initiated or due to policy violation)</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                    <p className="text-red-700">Change of mind after purchase</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                    <p className="text-red-700">Failure to use the service</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                    <p className="text-red-700">Technical issues on your end (browser, internet, device)</p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">4. Credit Packages</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our current credit packages (subject to change):
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left p-4 font-semibold text-black">Package</th>
                        <th className="text-left p-4 font-semibold text-black">Credits</th>
                        <th className="text-left p-4 font-semibold text-black">Price</th>
                        <th className="text-left p-4 font-semibold text-black">Refundable?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 text-gray-600">Starter Pack</td>
                        <td className="p-4 text-gray-600">10 Credits</td>
                        <td className="p-4 text-gray-600">₹99</td>
                        <td className="p-4 text-red-600 font-medium">No</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 text-gray-600">Growth Pack</td>
                        <td className="p-4 text-gray-600">50 Credits</td>
                        <td className="p-4 text-gray-600">₹299</td>
                        <td className="p-4 text-red-600 font-medium">No</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 text-gray-600">Professional Pack</td>
                        <td className="p-4 text-gray-600">100 Credits</td>
                        <td className="p-4 text-gray-600">₹499</td>
                        <td className="p-4 text-red-600 font-medium">No</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-gray-600">Enterprise Pack</td>
                        <td className="p-4 text-gray-600">250 Credits</td>
                        <td className="p-4 text-gray-600">₹999</td>
                        <td className="p-4 text-red-600 font-medium">No</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">5. Payment Issues</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  In the rare event of a technical payment issue:
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">If credits were not added after successful payment:</h4>
                  <ul className="text-blue-700 space-y-2">
                    <li>• Wait 5-10 minutes and refresh your dashboard</li>
                    <li>• Check your email for payment confirmation</li>
                    <li>• Contact us at idikudakarthik55@gmail.com with your Order ID</li>
                    <li>• We will verify with Razorpay and add credits if payment was successful</li>
                  </ul>
                  <p className="text-blue-700 mt-4 text-sm">
                    Note: This is credit adjustment, not a refund. If payment was successful, you will receive your credits.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">6. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  For any questions regarding this policy or credit-related issues:
                </p>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700"><strong>Email:</strong> idikudakarthik55@gmail.com</p>
                  <p className="text-gray-700 mt-2"><strong>Response Time:</strong> Within 24-48 hours</p>
                  <p className="text-gray-500 mt-4 text-sm">
                    Please include your registered email address and Order ID (if applicable) when contacting us.
                  </p>
                </div>
              </section>

              {/* Final Notice */}
              <section className="mb-10">
                <div className="bg-gray-900 text-white rounded-3xl p-8">
                  <h3 className="text-xl font-bold mb-4">By Purchasing Credits, You Agree:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>All purchases are final and non-refundable</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Credits never expire and stay in your account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>You have read and understood this policy</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Related Links */}
              <section className="mt-16 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-black mb-4">Related Legal Documents</h3>
                <div className="flex flex-wrap gap-4">
                  <Link href="/legal/terms" className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
                    Terms of Service
                  </Link>
                  <Link href="/legal/privacy" className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/legal/disclaimer" className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
                    Disclaimer
                  </Link>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>© 2026 SmartLeadTool. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
