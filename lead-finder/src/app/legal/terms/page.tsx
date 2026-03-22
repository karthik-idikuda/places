'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function TermsPage() {
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
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">Terms of Service</h1>
              <p className="text-gray-500">Last updated: January 15, 2025</p>
            </div>

            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-10">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Welcome to SmartLeadTool. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the SmartLeadTool platform, website, and services (collectively, the &quot;Service&quot;). Please read these Terms carefully before using our Service.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service.
                </p>
              </section>

              {/* Section 1 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">1. Company Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  SmartLeadTool is operated by SmartLeadTool, a sole proprietorship registered in India.
                </p>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700"><strong>Business Type:</strong> Sole Proprietorship</p>
                  <p className="text-gray-700 mt-2"><strong>Location:</strong> India</p>
                  <p className="text-gray-700 mt-2"><strong>Email:</strong> idikudakarthik55@gmail.com</p>
                  <p className="text-gray-700 mt-2"><strong>Support:</strong> idikudakarthik55@gmail.com</p>
                </div>
              </section>

              {/* Section 2 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">2. Description of Service</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  SmartLeadTool is a business-to-business (B2B) software-as-a-service (SaaS) platform designed to help web designers, digital marketers, and agencies discover potential clients. Our Service:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Identifies local businesses that do not have an online presence (website)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Provides publicly available contact information including business name, phone number, and address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Allows users to search by geographic location and business category</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Enables export of lead data in various formats (CSV, PDF, Excel)</span>
                  </li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  All business information provided through our Service is sourced from publicly available data, including but not limited to Google Maps and other public directories.
                </p>
              </section>

              {/* Section 3 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">3. Eligibility</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To use our Service, you must:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Be at least 18 years of age</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Have the legal capacity to enter into a binding agreement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Not be barred from using the Service under applicable law</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Be using the Service for legitimate business purposes</span>
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">4. User Accounts</h2>
                
                <h3 className="text-xl font-semibold text-black mb-3 mt-6">4.1 Account Creation</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To access certain features of the Service, you must create an account using Google Sign-In. By creating an account, you agree to:
                </p>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Provide accurate, current, and complete information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Maintain and promptly update your account information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Maintain the confidentiality of your account credentials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Accept responsibility for all activities under your account</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">4.2 Account Security</h3>
                <p className="text-gray-600 leading-relaxed">
                  You are responsible for safeguarding your account. You agree to notify us immediately at idikudakarthik55@gmail.com if you suspect any unauthorized access to or use of your account.
                </p>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">4.3 Account Termination</h3>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to suspend or terminate your account at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
                </p>
              </section>

              {/* Section 5 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">5. Credits and Payments</h2>
                
                <h3 className="text-xl font-semibold text-black mb-3 mt-6">5.1 Credit System</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our Service operates on a pay-as-you-go credit-based system. There are NO subscriptions, NO recurring charges, and NO automatic renewals. Each credit entitles you to reveal one verified business lead with complete details. Credits are:
                </p>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Non-transferable between accounts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Valid for lifetime (NEVER expire)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Non-refundable (all purchases are final)</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">5.2 Pricing</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Current credit packages are:
                </p>
                <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                  <p className="text-gray-700"><strong>Starter:</strong> 10 Credits for ₹99</p>
                  <p className="text-gray-700"><strong>Growth:</strong> 50 Credits for ₹299</p>
                  <p className="text-gray-700"><strong>Professional:</strong> 100 Credits for ₹499</p>
                  <p className="text-gray-700"><strong>Enterprise:</strong> 250 Credits for ₹999</p>
                </div>
                <p className="text-gray-600 leading-relaxed mt-4">
                  All prices are in Indian Rupees (INR) and include applicable taxes. We reserve the right to modify pricing at any time, but changes will not affect credits already purchased.
                </p>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">5.3 Payment Processing</h3>
                <p className="text-gray-600 leading-relaxed">
                  All payments are processed securely through Razorpay, a PCI DSS compliant payment gateway. We do not store your credit card, debit card, or banking information on our servers. By making a payment, you also agree to Razorpay&apos;s terms of service.
                </p>
              </section>

              {/* Section 6 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">6. No Refund Policy</h2>
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-4">
                  <h4 className="font-semibold text-red-800 mb-3">⚠️ All Credit Purchases Are Final</h4>
                  <p className="text-red-700 mb-4">
                    Due to the digital nature of our service, ALL credit purchases are final and non-refundable. No refunds will be issued under any circumstances.
                  </p>
                  <ul className="space-y-2 text-red-700">
                    <li>• Credits are non-refundable once purchased</li>
                    <li>• Credits NEVER expire - use them anytime</li>
                    <li>• No partial refunds are available</li>
                    <li>• Account cancellation does not result in refund</li>
                  </ul>
                </div>
                <p className="text-gray-600 leading-relaxed mt-4">
                  For complete details, please see our <Link href="/legal/refund" className="text-yellow-600 hover:underline">Refund Policy</Link>.
                </p>
              </section>

              {/* Section 7 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">7. Acceptable Use Policy</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You agree to use the Service only for lawful purposes. You shall NOT:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Use the Service for any unlawful or fraudulent purpose</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Spam, harass, or send unsolicited bulk communications to businesses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Misrepresent your identity or affiliation with any person or entity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Attempt to gain unauthorized access to any portion of the Service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Use automated scripts, bots, or scrapers to access the Service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Resell, sublicense, or redistribute the Service or data obtained</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Interfere with or disrupt the Service or servers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Violate any applicable local, state, national, or international law</span>
                  </li>
                </ul>
              </section>

              {/* Section 8 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">8. Intellectual Property</h2>
                
                <h3 className="text-xl font-semibold text-black mb-3 mt-6">8.1 Our Intellectual Property</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Service, including its original content, features, functionality, design, and branding, is owned by SmartLeadTool Technologies Private Limited and is protected by copyright, trademark, and other intellectual property laws.
                </p>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">8.2 Your Data</h3>
                <p className="text-gray-600 leading-relaxed">
                  You retain ownership of any data you provide to us. By using the Service, you grant us a limited license to use your data solely to provide and improve the Service.
                </p>
              </section>

              {/* Section 9 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">9. Disclaimer of Warranties</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                  <p className="text-gray-700 leading-relaxed">
                    THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
                  </p>
                  <ul className="space-y-2 text-gray-700 mt-4">
                    <li>• The Service will be uninterrupted, secure, or error-free</li>
                    <li>• The results obtained from the Service will be accurate or reliable</li>
                    <li>• All business information provided will be current or complete</li>
                    <li>• Any errors in the Service will be corrected</li>
                  </ul>
                </div>
              </section>

              {/* Section 10 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">10. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>We are not liable for any loss of profits, data, business opportunity, or goodwill</span>
                  </li>
                </ul>
              </section>

              {/* Section 11 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">11. Indemnification</h2>
                <p className="text-gray-600 leading-relaxed">
                  You agree to indemnify, defend, and hold harmless SmartLeadTool Technologies Private Limited, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, or expenses arising out of or related to your use of the Service, your violation of these Terms, or your violation of any rights of another.
                </p>
              </section>

              {/* Section 12 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">12. Third-Party Services</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our Service may integrate with or rely on third-party services including:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Google:</strong> For authentication and business data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Firebase:</strong> For data storage and user authentication</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Razorpay:</strong> For payment processing</span>
                  </li>
                </ul>
              </section>

              {/* Section 13 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">13. Governing Law and Dispute Resolution</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts located in [Your City], India.
                </p>
              </section>

              {/* Section 14 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">14. Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on the Service. Your continued use of the Service after such modifications constitutes your acceptance of the updated Terms.
                </p>
              </section>

              {/* Section 15 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-black mb-4">15. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700"><strong>Email:</strong> idikudakarthik55@gmail.com</p>
                  <p className="text-gray-700 mt-2"><strong>Support:</strong> idikudakarthik55@gmail.com</p>
                </div>
              </section>

              {/* Related Links */}
              <section className="mt-16 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-black mb-4">Related Legal Documents</h3>
                <div className="flex flex-wrap gap-4">
                  <Link href="/legal/privacy" className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
                    Privacy Policy
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
          <p>© 2026 SmartLeadTool Technologies Private Limited. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
