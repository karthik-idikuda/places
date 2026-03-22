'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AcceptableUsePage() {
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
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">Acceptable Use Policy</h1>
              <p className="text-gray-500">Last updated: January 15, 2025</p>
            </div>

            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-10">
                <p className="text-gray-600 text-lg leading-relaxed">
                  This Acceptable Use Policy (&quot;AUP&quot;) outlines the rules and guidelines for using SmartLeadTool&apos;s services. By using our Service, you agree to comply with this policy. Violation of this policy may result in suspension or termination of your account.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  This policy is designed to ensure that all users can benefit from our Service in a fair, safe, and legal manner. We reserve the right to update this policy at any time.
                </p>
              </section>

              {/* Section 1 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">1. Permitted Use</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  SmartLeadTool is intended for legitimate business development purposes. You may use our Service to:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                    <p className="text-green-700">Find businesses that may benefit from professional services you offer</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                    <p className="text-green-700">Reach out to potential clients with legitimate business proposals</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                    <p className="text-green-700">Build prospect lists for professional outreach campaigns</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                    <p className="text-green-700">Research market opportunities in specific geographic areas</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                    <p className="text-green-700">Export lead data for use in your CRM or marketing tools</p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">2. Prohibited Activities</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The following activities are strictly prohibited and will result in immediate account termination:
                </p>
                
                <h3 className="text-xl font-semibold text-black mb-3 mt-6">2.1 Spam and Harassment</h3>
                <div className="space-y-3 mb-6">
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Sending unsolicited bulk emails or messages to businesses</p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Repeated or harassing contact after a business requests to be left alone</p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Using automated dialers or robocalls to contact businesses</p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Sending misleading, deceptive, or fraudulent communications</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">2.2 Data Misuse</h3>
                <div className="space-y-3 mb-6">
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Selling, renting, or redistributing lead data to third parties</p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Creating competing services using data obtained from SmartLeadTool</p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Scraping, crawling, or automated extraction of data beyond normal use</p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Storing lead data beyond reasonable business needs</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">2.3 Illegal Activities</h3>
                <div className="space-y-3 mb-6">
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Using our Service for any illegal purpose or activity</p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Violating any applicable laws, regulations, or industry standards</p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Engaging in fraud, identity theft, or misrepresentation</p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Stalking, threatening, or intimidating businesses or individuals</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">2.4 System Abuse</h3>
                <div className="space-y-3">
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Attempting to bypass credit limits or manipulate the billing system</p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Creating multiple accounts to circumvent restrictions</p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Attempting to reverse engineer, hack, or compromise our systems</p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Interfering with other users&apos; access to the Service</p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                    <p className="text-amber-700">Using bots, scripts, or automated tools without authorization</p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">3. Email and Communication Guidelines</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  When using lead data for outreach, you must follow these guidelines:
                </p>
                
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-black font-bold text-xs">1</span>
                    </span>
                    <div>
                      <h4 className="font-semibold text-black">Be Transparent</h4>
                      <p className="text-gray-600 text-sm">Clearly identify yourself and your business in all communications</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-black font-bold text-xs">2</span>
                    </span>
                    <div>
                      <h4 className="font-semibold text-black">Provide Opt-Out</h4>
                      <p className="text-gray-600 text-sm">Always include a clear way for recipients to opt out of future communications</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-black font-bold text-xs">3</span>
                    </span>
                    <div>
                      <h4 className="font-semibold text-black">Respect Boundaries</h4>
                      <p className="text-gray-600 text-sm">Honor opt-out requests immediately and maintain a suppression list</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-black font-bold text-xs">4</span>
                    </span>
                    <div>
                      <h4 className="font-semibold text-black">Keep It Professional</h4>
                      <p className="text-gray-600 text-sm">Maintain professional tone and provide genuine value in your outreach</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-black font-bold text-xs">5</span>
                    </span>
                    <div>
                      <h4 className="font-semibold text-black">Follow Local Laws</h4>
                      <p className="text-gray-600 text-sm">Comply with all applicable email marketing and communication laws</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">4. Account Sharing</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Your SmartLeadTool account is for your personal or business use only:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Do not share your account credentials with others</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Do not allow multiple people to use a single account</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Do not sell or transfer your account to another person</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>You are responsible for all activity under your account</span>
                  </li>
                </ul>
              </section>

              {/* Section 5 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">5. Fair Usage</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To ensure fair access for all users, please observe these guidelines:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Use credits within reasonable time periods</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Avoid excessive API calls or rapid-fire searches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Do not attempt to circumvent rate limits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Report any bugs or vulnerabilities responsibly</span>
                  </li>
                </ul>
              </section>

              {/* Section 6 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">6. Consequences of Violation</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Violations of this Acceptable Use Policy may result in:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                    <h4 className="font-semibold text-yellow-800 mb-2">Warning</h4>
                    <p className="text-yellow-700 text-sm">For first-time minor violations, we may issue a warning and request corrective action.</p>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                    <h4 className="font-semibold text-orange-800 mb-2">Temporary Suspension</h4>
                    <p className="text-orange-700 text-sm">Repeated or moderate violations may result in temporary account suspension.</p>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                    <h4 className="font-semibold text-red-800 mb-2">Permanent Termination</h4>
                    <p className="text-red-700 text-sm">Serious violations will result in immediate and permanent account termination without refund.</p>
                  </div>
                  
                  <div className="bg-gray-100 border border-gray-300 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-800 mb-2">Legal Action</h4>
                    <p className="text-gray-700 text-sm">We reserve the right to pursue legal action for violations that cause harm or break the law.</p>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">7. Reporting Violations</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you become aware of any violations of this policy, please report them to us:
                </p>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700"><strong>Email:</strong> idikudakarthik55@gmail.com</p>
                  <p className="text-gray-700 mt-2"><strong>Subject:</strong> AUP Violation Report</p>
                  <p className="text-gray-600 mt-4 text-sm">
                    Please include as much detail as possible, including screenshots or evidence if available. All reports are confidential.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">8. Policy Updates</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Acceptable Use Policy from time to time. Material changes will be communicated via email or through our website. Your continued use of the Service after any changes constitutes acceptance of the updated policy.
                </p>
              </section>

              {/* Section 9 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">9. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have questions about this Acceptable Use Policy:
                </p>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700"><strong>General Inquiries:</strong> idikudakarthik55@gmail.com</p>
                  <p className="text-gray-700 mt-2"><strong>Policy Questions:</strong> idikudakarthik55@gmail.com</p>
                  <p className="text-gray-700 mt-2"><strong>Report Abuse:</strong> idikudakarthik55@gmail.com</p>
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
