'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CookiesPage() {
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
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">Cookie Policy</h1>
              <p className="text-gray-500">Last updated: January 15, 2025</p>
            </div>

            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-10">
                <p className="text-gray-600 text-lg leading-relaxed">
                  This Cookie Policy explains how SmartLeadTool (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar tracking technologies on our website and platform. This policy provides you with clear and comprehensive information about the cookies we use and the purposes for using them.
                </p>
              </section>

              {/* Section 1 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">1. What Are Cookies?</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is being used.
                </p>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-black mb-3">How Cookies Work</h4>
                  <p className="text-gray-600">
                    When you visit our website, our server sends a cookie to your browser. Your browser stores this cookie and sends it back to us each time you return. This allows us to recognize you and remember your preferences, making your subsequent visits easier and the site more useful to you.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">2. Types of Cookies We Use</h2>
                
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-green-800">Essential Cookies (Required)</h3>
                    </div>
                    <p className="text-green-700 mb-4">
                      These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure access, and authentication. The website cannot function properly without these cookies.
                    </p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-green-200">
                          <th className="text-left py-2 text-green-800">Cookie Name</th>
                          <th className="text-left py-2 text-green-800">Purpose</th>
                          <th className="text-left py-2 text-green-800">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-green-700">
                        <tr className="border-b border-green-100">
                          <td className="py-2">__session</td>
                          <td className="py-2">Firebase authentication session</td>
                          <td className="py-2">Session</td>
                        </tr>
                        <tr className="border-b border-green-100">
                          <td className="py-2">firebase-auth</td>
                          <td className="py-2">Google Sign-In authentication</td>
                          <td className="py-2">30 days</td>
                        </tr>
                        <tr>
                          <td className="py-2">csrf_token</td>
                          <td className="py-2">Cross-site request forgery protection</td>
                          <td className="py-2">Session</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-blue-800">Analytics Cookies</h3>
                    </div>
                    <p className="text-blue-700 mb-4">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
                    </p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-blue-200">
                          <th className="text-left py-2 text-blue-800">Cookie Name</th>
                          <th className="text-left py-2 text-blue-800">Purpose</th>
                          <th className="text-left py-2 text-blue-800">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-blue-700">
                        <tr className="border-b border-blue-100">
                          <td className="py-2">_ga</td>
                          <td className="py-2">Google Analytics - distinguishes users</td>
                          <td className="py-2">2 years</td>
                        </tr>
                        <tr className="border-b border-blue-100">
                          <td className="py-2">_gid</td>
                          <td className="py-2">Google Analytics - distinguishes users</td>
                          <td className="py-2">24 hours</td>
                        </tr>
                        <tr>
                          <td className="py-2">_gat</td>
                          <td className="py-2">Google Analytics - request throttling</td>
                          <td className="py-2">1 minute</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-yellow-800">Functional Cookies</h3>
                    </div>
                    <p className="text-yellow-700 mb-4">
                      These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                    </p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-yellow-200">
                          <th className="text-left py-2 text-yellow-800">Cookie Name</th>
                          <th className="text-left py-2 text-yellow-800">Purpose</th>
                          <th className="text-left py-2 text-yellow-800">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-yellow-700">
                        <tr className="border-b border-yellow-100">
                          <td className="py-2">user_preferences</td>
                          <td className="py-2">Remembers user preferences</td>
                          <td className="py-2">1 year</td>
                        </tr>
                        <tr>
                          <td className="py-2">recent_searches</td>
                          <td className="py-2">Stores recent search history locally</td>
                          <td className="py-2">30 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">3. Third-Party Cookies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use services from third parties that may set cookies on your device:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-semibold text-black mb-2">Google (Firebase)</h4>
                    <p className="text-gray-600 text-sm mb-2">Used for authentication and analytics. See Google&apos;s privacy policy for more information.</p>
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-yellow-600 text-sm hover:underline">
                      Google Privacy Policy →
                    </a>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-semibold text-black mb-2">Razorpay</h4>
                    <p className="text-gray-600 text-sm mb-2">Used for payment processing. Razorpay may set cookies for fraud prevention and security.</p>
                    <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 text-sm hover:underline">
                      Razorpay Privacy Policy →
                    </a>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">4. Managing Cookies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You have several options for managing cookies:
                </p>
                
                <h3 className="text-xl font-semibold text-black mb-3 mt-6">4.1 Browser Settings</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Most web browsers allow you to control cookies through their settings. You can usually find these settings in the &quot;Options&quot; or &quot;Preferences&quot; menu of your browser.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                    <h4 className="font-semibold text-black">Chrome</h4>
                    <p className="text-gray-500 text-sm">Manage cookies in Chrome →</p>
                  </a>
                  <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                    <h4 className="font-semibold text-black">Firefox</h4>
                    <p className="text-gray-500 text-sm">Manage cookies in Firefox →</p>
                  </a>
                  <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                    <h4 className="font-semibold text-black">Safari</h4>
                    <p className="text-gray-500 text-sm">Manage cookies in Safari →</p>
                  </a>
                  <a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                    <h4 className="font-semibold text-black">Edge</h4>
                    <p className="text-gray-500 text-sm">Manage cookies in Edge →</p>
                  </a>
                </div>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">4.2 Impact of Disabling Cookies</h3>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
                  <p className="text-amber-700">
                    <strong>Warning:</strong> Disabling essential cookies will prevent you from using certain features of our Service, including logging in and making purchases. We strongly recommend keeping essential cookies enabled for the best experience.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">5. Local Storage and Similar Technologies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  In addition to cookies, we may use other similar technologies to store information locally on your device:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Local Storage:</strong> Used to store user preferences and cache data for faster loading</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Session Storage:</strong> Used for temporary data during your browsing session</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>IndexedDB:</strong> May be used to store larger amounts of structured data locally</span>
                  </li>
                </ul>
              </section>

              {/* Section 6 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">6. Do Not Track Signals</h2>
                <p className="text-gray-600 leading-relaxed">
                  Some browsers have a &quot;Do Not Track&quot; feature that lets you tell websites not to track you. Currently, our website does not respond to Do Not Track signals. However, you can still control cookies and tracking through your browser settings as described above.
                </p>
              </section>

              {/* Section 7 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">7. Updates to This Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              {/* Section 8 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">8. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700"><strong>Email:</strong> idikudakarthik55@gmail.com</p>
                  <p className="text-gray-700 mt-2"><strong>Subject:</strong> Cookie Policy Inquiry</p>
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
                  <Link href="/legal/refund" className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
                    Refund Policy
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
          <p>© 2026 SmartLeadTool Technologies Private Limited. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
