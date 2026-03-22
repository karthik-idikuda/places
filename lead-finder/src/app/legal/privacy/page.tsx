'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
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
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">Privacy Policy</h1>
              <p className="text-gray-500">Last updated: January 15, 2025</p>
            </div>

            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-10">
                <p className="text-gray-600 text-lg leading-relaxed">
                  At SmartLeadTool (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  This policy applies to all users of the SmartLeadTool platform, website, and related services. By using our Service, you consent to the practices described in this Privacy Policy.
                </p>
              </section>

              {/* Section 1 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">1. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-black mb-3 mt-6">1.1 Personal Information</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  When you create an account using Google Sign-In, we collect the following information from your Google account:
                </p>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Full name</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Email address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Profile picture URL</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Google account ID (unique identifier)</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">1.2 Payment Information</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  All payment processing is handled by Razorpay. We do NOT store on our servers:
                </p>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Credit card or debit card numbers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>CVV or security codes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Bank account numbers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>UPI IDs</span>
                  </li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  We only store transaction references, payment status, and order IDs for record-keeping and customer support purposes.
                </p>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">1.3 Usage Data</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We automatically collect certain information when you use our Service:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Search queries (locations and business categories)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Lead viewing and export history</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>IP address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Browser type and version</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Device type and operating system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Access times and pages viewed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Referring website URL</span>
                  </li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use the collected information for the following purposes:
                </p>
                
                <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                  <h4 className="font-semibold text-black mb-3">Service Delivery</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• To provide, maintain, and improve our Service</li>
                    <li>• To process transactions and manage your account</li>
                    <li>• To track credit usage and maintain account balance</li>
                    <li>• To provide customer support</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                  <h4 className="font-semibold text-black mb-3">Communication</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• To send transactional emails (purchase confirmations, receipts)</li>
                    <li>• To send important service updates and security alerts</li>
                    <li>• To respond to your inquiries and support requests</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                  <h4 className="font-semibold text-black mb-3">Analytics and Improvement</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• To analyze usage patterns and improve user experience</li>
                    <li>• To develop new features and services</li>
                    <li>• To monitor and prevent fraud and abuse</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-black mb-3">Legal Compliance</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• To comply with legal obligations</li>
                    <li>• To enforce our Terms of Service</li>
                    <li>• To protect our rights, privacy, safety, or property</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">3. Data Storage and Security</h2>
                
                <h3 className="text-xl font-semibold text-black mb-3 mt-6">3.1 Where We Store Your Data</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Your data is stored securely using the following services:
                </p>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Google Firebase (Firestore):</strong> User accounts, credits, search history</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Firebase Authentication:</strong> User authentication data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Razorpay:</strong> Payment processing (PCI DSS compliant)</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">3.2 Security Measures</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We implement appropriate security measures to protect your data:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>SSL/TLS encryption for all data transmission</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Encryption at rest for stored data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Secure authentication via Google OAuth 2.0</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Regular security audits and monitoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Access controls and authentication for internal systems</span>
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We do NOT sell, rent, or trade your personal information. We may share your information only in the following circumstances:
                </p>
                
                <h3 className="text-xl font-semibold text-black mb-3 mt-6">4.1 Service Providers</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We share information with trusted third-party service providers who assist us in operating our Service:
                </p>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Google/Firebase:</strong> Authentication and data storage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Razorpay:</strong> Payment processing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Google Cloud:</strong> Infrastructure and hosting</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">4.2 Legal Requirements</h3>
                <p className="text-gray-600 leading-relaxed">
                  We may disclose your information if required by law, court order, or government request, or if we believe disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.
                </p>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">4.3 Business Transfers</h3>
                <p className="text-gray-600 leading-relaxed">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity. We will notify you via email and/or a prominent notice on our website of any change in ownership.
                </p>
              </section>

              {/* Section 5 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">5. Cookies and Tracking Technologies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your experience:
                </p>
                
                <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                  <h4 className="font-semibold text-black mb-3">Essential Cookies</h4>
                  <p className="text-gray-600">Required for the Service to function properly, including authentication and session management.</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                  <h4 className="font-semibold text-black mb-3">Analytics Cookies</h4>
                  <p className="text-gray-600">Help us understand how users interact with our Service to improve functionality and user experience.</p>
                </div>

                <p className="text-gray-600 leading-relaxed mt-4">
                  You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our Service. For more details, see our <Link href="/legal/cookies" className="text-yellow-600 hover:underline">Cookie Policy</Link>.
                </p>
              </section>

              {/* Section 6 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">6. Your Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Access:</strong> Request a copy of the personal information we hold about you</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Correction:</strong> Request correction of inaccurate personal information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Deletion:</strong> Request deletion of your account and personal information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Data Portability:</strong> Request your data in a structured, machine-readable format</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</span>
                  </li>
                </ul>
                
                <p className="text-gray-600 leading-relaxed mt-4">
                  To exercise these rights, please contact us at idikudakarthik55@gmail.com. We will respond to your request within 30 days.
                </p>
              </section>

              {/* Section 7 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">7. Data Retention</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We retain your personal information for as long as:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Your account is active</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Necessary to provide you with the Service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Required to comply with legal obligations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Necessary for legitimate business purposes</span>
                  </li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  If you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain certain information for legal or business purposes.
                </p>
              </section>

              {/* Section 8 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">8. Children&apos;s Privacy</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our Service is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at idikudakarthik55@gmail.com, and we will delete such information.
                </p>
              </section>

              {/* Section 9 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">9. International Data Transfers</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws different from your country. We ensure appropriate safeguards are in place to protect your information in compliance with applicable laws.
                </p>
              </section>

              {/* Section 10 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically.
                </p>
              </section>

              {/* Section 11 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">11. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700"><strong>Data Protection Officer:</strong> idikudakarthik55@gmail.com</p>
                  <p className="text-gray-700 mt-2"><strong>General Inquiries:</strong> idikudakarthik55@gmail.com</p>
                  <p className="text-gray-700 mt-2"><strong>Legal:</strong> idikudakarthik55@gmail.com</p>
                </div>
              </section>

              {/* Section 12 - Indian Specific */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">12. Compliance with Indian Data Protection Laws</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We comply with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. We are committed to protecting your Sensitive Personal Data or Information (SPDI) as defined under Indian law.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  As a data fiduciary, we ensure that your personal data is processed fairly, lawfully, and transparently in accordance with applicable Indian data protection regulations.
                </p>
              </section>

              {/* Related Links */}
              <section className="mt-16 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-black mb-4">Related Legal Documents</h3>
                <div className="flex flex-wrap gap-4">
                  <Link href="/legal/terms" className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
                    Terms of Service
                  </Link>
                  <Link href="/legal/refund" className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
                    Refund Policy
                  </Link>
                  <Link href="/legal/cookies" className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
                    Cookie Policy
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
          <p>© 2025 SmartLeadTool. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
