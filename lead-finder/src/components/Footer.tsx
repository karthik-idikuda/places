'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { label: 'Find Leads', href: '/search' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'How It Works', href: '/about' },
      { label: 'FAQ', href: '/faq' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    legal: [
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Refund Policy', href: '/legal/refund' },
    ],
  }

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img src="/logo.svg" alt="SmartLeadTool" className="w-12 h-12 rounded-xl" />
              <span className="text-2xl font-bold">
                SmartLeadTool
              </span>
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
              Find businesses without websites and connect with potential clients. 
              The smart way to grow your web development or marketing business.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:idikudakarthik55@gmail.com"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">
              Product
            </h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">
              Legal
            </h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} SmartLeadTool. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              A product by <span className="text-white">Karthik Idikuda</span>
            </p>
            <a
              href="mailto:idikudakarthik55@gmail.com"
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              idikudakarthik55@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
