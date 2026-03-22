'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function DisclaimerPage() {
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
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">Disclaimer</h1>
              <p className="text-gray-500">Last updated: January 15, 2025</p>
            </div>

            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-10">
                <p className="text-gray-600 text-lg leading-relaxed">
                  The information provided by SmartLeadTool (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on our website and through our Service is for general informational and business development purposes only. Please read this disclaimer carefully before using our Service.
                </p>
              </section>

              {/* Section 1 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">1. Data Accuracy Disclaimer</h2>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-2xl mb-6">
                  <h4 className="font-bold text-yellow-800 mb-2">Important Notice</h4>
                  <p className="text-yellow-800">
                    The business data provided through SmartLeadTool is sourced from third-party providers, including the Google Places API. We do not guarantee the accuracy, completeness, or timeliness of this information.
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">
                  Specifically, we make no warranties or representations regarding:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>The accuracy of business names, addresses, or contact information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Whether a business currently has or lacks a website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>The current operational status of any business</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>The accuracy of phone numbers or email addresses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Business hours, ratings, or review information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>The completeness of search results for any location or category</span>
                  </li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">2. No Guarantee of Results</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  While SmartLeadTool is designed to help you find potential business leads, we make no guarantees regarding:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <p className="text-gray-700">The number or quality of leads you will find</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <p className="text-gray-700">Your success in converting leads into paying clients</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <p className="text-gray-700">The response rate from businesses you contact</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <p className="text-gray-700">Any specific financial outcomes or revenue generation</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <p className="text-gray-700">The suitability of leads for your specific business needs</p>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed mt-4">
                  Your success depends on many factors outside our control, including but not limited to your outreach strategy, service quality, pricing, communication skills, and market conditions.
                </p>
              </section>

              {/* Section 3 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">3. Third-Party Data Sources</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our Service relies on data from third-party sources, primarily the Google Places API. We have no control over this data and are not responsible for:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Errors or inaccuracies in the source data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Outdated information that has not been updated by the source</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Changes to third-party APIs or data availability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Service interruptions from third-party providers</span>
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">4. No Professional Advice</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The information and data provided through SmartLeadTool does not constitute:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Legal advice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Business consulting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Marketing strategy advice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Financial or investment advice</span>
                  </li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  You should consult with appropriate professionals before making business decisions based on data obtained through our Service.
                </p>
              </section>

              {/* Section 5 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">5. User Responsibility</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You are solely responsible for:
                </p>
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-xs">1</span>
                    </span>
                    <div>
                      <h4 className="font-semibold text-black">Verification</h4>
                      <p className="text-gray-600 text-sm">Independently verifying any information before using it</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-xs">2</span>
                    </span>
                    <div>
                      <h4 className="font-semibold text-black">Legal Compliance</h4>
                      <p className="text-gray-600 text-sm">Ensuring your use of the data complies with all applicable laws</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-xs">3</span>
                    </span>
                    <div>
                      <h4 className="font-semibold text-black">Ethical Conduct</h4>
                      <p className="text-gray-600 text-sm">Using the data ethically and responsibly in your outreach</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-xs">4</span>
                    </span>
                    <div>
                      <h4 className="font-semibold text-black">Decision Making</h4>
                      <p className="text-gray-600 text-sm">Any business decisions you make based on the data provided</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">6. Website Content</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The content on our website, including text, graphics, images, and other material, is provided for general information purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>The completeness, accuracy, reliability, or availability of the website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Any information, products, services, or related graphics contained on the website</span>
                  </li>
                </ul>
              </section>

              {/* Section 7 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">7. External Links</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our website may contain links to external websites that are not operated by us. We have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies or content. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them.
                </p>
              </section>

              {/* Section 8 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">8. Service Availability</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We do not guarantee that our Service will be:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Available at all times without interruption</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Free from errors, bugs, or security vulnerabilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Compatible with all devices or browsers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Free from harmful components</span>
                  </li>
                </ul>
              </section>

              {/* Section 9 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">9. Limitation of Liability</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <p className="text-amber-800 font-medium mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                  </p>
                  <p className="text-amber-700">
                    SmartLeadTool, its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of or inability to use the Service, even if we have been advised of the possibility of such damages.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">10. Indemnification</h2>
                <p className="text-gray-600 leading-relaxed">
                  You agree to indemnify and hold harmless SmartLeadTool and its officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to your violation of this Disclaimer or your use of the Service.
                </p>
              </section>

              {/* Section 11 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">11. Changes to This Disclaimer</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify this Disclaimer at any time. Changes will be effective immediately upon posting to our website. Your continued use of the Service after any modifications constitutes acceptance of the updated Disclaimer.
                </p>
              </section>

              {/* Section 12 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">12. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about this Disclaimer, please contact us:
                </p>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700"><strong>Email:</strong> idikudakarthik55@gmail.com</p>
                  <p className="text-gray-700 mt-2"><strong>Subject:</strong> Disclaimer Inquiry</p>
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
                  <Link href="/legal/acceptable-use" className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
                    Acceptable Use
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
