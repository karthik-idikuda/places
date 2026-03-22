'use client'

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const fadeIn = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -100, rotateY: 20 },
  visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const slideInRight = {
  hidden: { opacity: 0, x: 100, rotateY: -20 },
  visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const hover3D = {
  rest: { transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)" },
  hover: { transform: "perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.02)", transition: { duration: 0.4 } }
}

// ============================================
// PARALLAX SECTION COMPONENT
// ============================================
const ParallaxSection = ({ 
  children, 
  className = '',
  id = '',
  speed = 0.5
}: { 
  children: React.ReactNode
  className?: string
  id?: string
  speed?: number
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ y }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// ============================================
// INFINITE SCROLL COMPONENT
// ============================================
const InfiniteScroll = ({ items, direction = 'left', speed = 30 }: { items: string[], direction?: 'left' | 'right', speed?: number }) => {
  return (
    <div className="relative overflow-hidden py-10">
      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, -1920] : [-1920, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            className="text-7xl lg:text-9xl font-black text-transparent select-none tracking-tighter"
            style={{ 
              WebkitTextStroke: '2px #e5e7eb',
              textShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ============================================
// FLOATING IMAGE COMPONENT
// ============================================
const FloatingImage = ({ src, alt, className, delay = 0 }: { src: string, alt: string, className?: string, delay?: number }) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <Image src={src} alt={alt} fill className="object-cover rounded-2xl" quality={90} />
    </motion.div>
  )
}

// ============================================
// MAGNETIC BUTTON COMPONENT
// ============================================
const MagneticButton = ({ children, className, href }: { children: React.ReactNode, className?: string, href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.2)
    y.set((e.clientY - centerY) * 0.2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  )
}

// ============================================
// CREDIT-BASED PRICING PLANS
// ============================================
const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 99,
    credits: 10,
    description: 'Perfect for trying out',
    features: [
      '10 Credits',
      'CSV Export',
      'WhatsApp Direct',
      'Click-to-Call',
      'Business Details',
      'Phone Numbers',
    ],
    notIncluded: [
      'PDF/Excel Export',
      'Save Leads',
      'Priority Support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 299,
    credits: 50,
    description: 'Best value for agencies',
    features: [
      '50 Credits',
      'All Export Formats',
      'WhatsApp Direct',
      'Click-to-Call',
      'Business Details',
      'Phone Numbers',
      'Save Leads',
      'Search History',
    ],
    notIncluded: [
      'Priority Support',
    ],
    cta: 'Buy Now',
    popular: true,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 499,
    credits: 100,
    description: 'For power users',
    features: [
      '100 Credits',
      'All Export Formats',
      'WhatsApp Direct',
      'Click-to-Call',
      'Business Details',
      'Phone Numbers',
      'Save Leads',
      'Search History',
      'Priority Support',
      'Bulk Export',
    ],
    notIncluded: [],
    cta: 'Buy Now',
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 999,
    credits: 250,
    description: 'Maximum value',
    features: [
      '250 Credits',
      'All Export Formats',
      'WhatsApp Direct',
      'Click-to-Call',
      'Business Details',
      'Phone Numbers',
      'Save Leads',
      'Search History',
      'Priority Support',
      'Bulk Export',
      'API Access',
    ],
    notIncluded: [],
    cta: 'Buy Now',
    popular: false,
  },
]

// ============================================
// FAQ DATA
// ============================================
const FAQ_DATA = [
  {
    question: 'How does SmartLeadTool work?',
    answer: 'Enter a location and business type. We search for businesses in that area and filter those without websites - making them ideal leads for web designers, marketers, and agencies looking for clients. Searching is FREE - you only use credits when you reveal contact details.'
  },
  {
    question: 'What is a credit?',
    answer: 'One credit equals one lead revealed with complete details including phone number, address, and business information. Searching for leads is free - you only spend credits when you reveal/download a lead\'s contact information.'
  },
  {
    question: 'How accurate is the data?',
    answer: 'We use real-time business data from verified sources. All phone numbers and addresses are validated to ensure accuracy.'
  },
  {
    question: 'Can I export the leads?',
    answer: 'Yes. Starter package includes CSV export. Growth, Professional and Enterprise packages include PDF and Excel export options as well.'
  },
  {
    question: 'Do credits expire?',
    answer: 'No. Your purchased credits NEVER expire. Use them whenever you need leads - they stay in your account forever.'
  },
  {
    question: 'Is there a refund policy?',
    answer: 'All credit purchases are final and non-refundable. Since credits never expire, you can use them anytime. Please review our Refund Policy page for complete details.'
  },
  {
    question: 'Is there a subscription?',
    answer: 'No. SmartLeadTool uses a simple pay-as-you-go credit system. Buy credits when you need them - no recurring charges, no monthly fees, no automatic renewals.'
  },
]

// ============================================
// NAVBAR COMPONENT
// ============================================
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 lg:gap-3">
            <Image src="/logo.svg" alt="SmartLeadTool" width={40} height={40} className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl" />
            <span className="text-lg lg:text-xl font-bold text-black tracking-tight">
              SmartLeadTool
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-300">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-300">How It Works</a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-300">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-300">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/signin" className="hidden sm:block px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300">
              Sign In
            </Link>
            <Link href="/auth/signin" className="px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg shadow-black/20">
              Get Started
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-0.5 bg-black block transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-black block transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-black block transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
        className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
      >
        <div className="px-4 py-6 space-y-4">
          <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-gray-700">Features</a>
          <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-gray-700">How It Works</a>
          <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-gray-700">Pricing</a>
          <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-gray-700">FAQ</a>
          <hr className="border-gray-200" />
          <Link href="/auth/signin" className="block text-base font-medium text-gray-700">Sign In</Link>
        </div>
      </motion.div>
    </motion.nav>
  )
}

// ============================================
// FOOTER COMPONENT
// ============================================
const Footer = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-yellow-400 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ top: '-10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-yellow-400 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ bottom: '-10%', right: '10%' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-black font-bold text-xl">
                 S
              </span>
              <span className="text-xl font-bold tracking-tight">SmartLeadTool</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Find businesses without websites and grow your agency with verified leads.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm tracking-wide">Product</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#features" className="hover:text-yellow-400 transition-colors duration-300">Features</a></li>
              <li><a href="#pricing" className="hover:text-yellow-400 transition-colors duration-300">Pricing</a></li>
              <li><a href="#faq" className="hover:text-yellow-400 transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm tracking-wide">Legal</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/legal/terms" className="hover:text-yellow-400 transition-colors duration-300">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-yellow-400 transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link href="/legal/refund" className="hover:text-yellow-400 transition-colors duration-300">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm tracking-wide">Policies</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/legal/cookies" className="hover:text-yellow-400 transition-colors duration-300">Cookie Policy</Link></li>
              <li><Link href="/legal/acceptable-use" className="hover:text-yellow-400 transition-colors duration-300">Acceptable Use</Link></li>
              <li><Link href="/legal/disclaimer" className="hover:text-yellow-400 transition-colors duration-300">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm tracking-wide">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="mailto:idikudakarthik55@gmail.com" className="hover:text-yellow-400 transition-colors duration-300">hello@smartleadtool.com</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 SmartLeadTool. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  // Parallax values
  const heroRef = useRef(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const heroY = useTransform(heroProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 0.9])

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-yellow-400 origin-left z-[60]"
      />

      <Navbar />

      {/* ============================================ */}
      {/* HERO SECTION - REDESIGNED */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative min-h-[120vh] flex items-center pt-32 lg:pt-0 overflow-hidden bg-[#FAFAFA] perspective-1000">
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#FAFAFA]" />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="max-w-xl lg:max-w-none">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {/* Badge */}
                <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 border border-yellow-200 rounded-full transition-all cursor-default">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-yellow-800">New Engine V2.0</span>
                  </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-black text-black leading-[0.95] tracking-tighter mb-8"
                >
                  <span className="block text-gray-900 pb-2">Connect with</span>
                  <span className="relative inline-block">
                    Local Vendors
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-400 -z-10 -rotate-2 origin-left opacity-70"
                    />
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={fadeInUp}
                  className="text-xl lg:text-2xl text-gray-600 mb-6 leading-relaxed font-light"
                >
                  Find shops, mechanics, and local services who need your help. <span className="font-semibold text-black">Simple & Direct.</span>
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="text-base text-gray-500 mb-10 max-w-md"
                >
                  The easiest way to find local business owners who need websites and digital services.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 mb-12">
                  <MagneticButton
                    href="/auth/signin"
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white text-base font-bold rounded-2xl overflow-hidden shadow-xl transition-all hover:scale-105"
                  >
                    <span className="relative z-10">Start Finding Leads</span>
                    <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </MagneticButton>
                  
                  <MagneticButton
                    href="#how-it-works"
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-base font-bold rounded-2xl border border-gray-200 shadow-lg transition-all hover:scale-105 hover:border-gray-300"
                  >
                     <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-yellow-400 transition-colors duration-300">
                        <svg className="w-3 h-3 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
                     </span>
                     <span>See Demo</span>
                  </MagneticButton>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content - Visual Dashboard Preview */}
            <motion.div 
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:block perspective-2000"
            >
              <div className="relative transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out preserve-3d group">
                 {/* Main Dashboard Card */}
                 <div className="relative z-20 bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
                    <div className="bg-gray-50 border-b border-gray-100 p-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <div className="ml-4 px-3 py-1 bg-white rounded-md text-xs text-gray-500 border border-gray-200">Local Search: "Bakery"</div>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Sample List */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold">DP</div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Downtown Pastries</h4>
                                        <p className="text-sm text-gray-500">Main Street • Bakery</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full">No Website</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">JM</div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Joe's Mechanics</h4>
                                        <p className="text-sm text-gray-500">West End • Auto Repair</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full">No Website</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">CF</div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">City Florist</h4>
                                        <p className="text-sm text-gray-500">Central Park • Florist</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full">Has Website</span>
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* Simple Stats Floater */}
                 <div className="absolute -right-8 top-10 z-30 transform translate-z-20">
                    <div className="bg-black text-white p-4 rounded-xl shadow-xl">
                       <p className="text-2xl font-bold">50+</p>
                       <p className="text-xs text-gray-400">Local Shops Found</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 font-medium">Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center pt-1.5">
            <motion.div 
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1.5 bg-gray-400 rounded-full" 
            />
          </div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* INFINITE SCROLL MARQUEE */}
      {/* ============================================ */}
      <section className="py-8 bg-gray-50 overflow-hidden border-y border-gray-100">
        <InfiniteScroll 
          items={['SHOPS', 'VENDORS', 'MECHANICS', 'BAKERIES', 'FLORISTS']} 
          direction="left"
          speed={25}
        />
      </section>

      {/* ============================================ */}
      {/* TRUSTED BY SECTION */}
      {/* ============================================ */}
      <ParallaxSection className="py-20 lg:py-28 bg-white" speed={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeIn} 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16 items-center justify-items-center"
          >
            {['Web Designers', 'Freelancers', 'Digital Agencies', 'Consultants'].map((item, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.1 }}
                className="text-xl lg:text-2xl font-bold text-gray-300 hover:text-gray-500 transition-colors duration-300 cursor-default"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ============================================ */}
      {/* FEATURES SECTION WITH PARALLAX IMAGES */}
      {/* ============================================ */}
      <ParallaxSection id="features" className="py-20 lg:py-32" speed={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <motion.span variants={fadeInUp} className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4">
              Features
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-6xl font-bold text-black tracking-tight mb-4">
              Simple Tools for Freelancers
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
              We help you find local business owners who need your services.
            </motion.p>
          </div>

          {/* Feature 1 - Slide from Left */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-40">

            <motion.div 
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="order-2 lg:order-1"
            >
              <span className="text-yellow-500 font-semibold text-sm tracking-widest">VERIFIED DATA</span>
              <h3 className="text-2xl lg:text-5xl font-bold text-black mt-3 mb-5 leading-tight">Direct Phone Numbers</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Get verified phone numbers for every business lead. Contact decision makers directly without going through gatekeepers.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Verified', 'Direct Lines', 'Updated'].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div 
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2 relative perspective-1000"
            >
              <div className="relative transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out preserve-3d">
                 {/* Main Contact Card */}
                 <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative z-10 w-[90%] mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="w-16 h-16 rounded-full bg-yellow-400 p-1">
                          <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="CEO" width={64} height={64} className="rounded-full border-2 border-white" />
                       </div>
                       <div>
                          <h4 className="text-xl font-bold text-gray-900">Johnathan Doe</h4>
                          <p className="text-gray-500">CEO & Founder, TechSpace</p>
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 p-3 bg-green-50 rounded-xl border border-green-100">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          </div>
                          <div>
                             <p className="text-xs text-green-700 font-bold uppercase">Direct Mobile</p>
                             <p className="text-lg font-bold text-gray-900">+1 (555) 123-4567</p>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 group hover:bg-yellow-50 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-gray-200 group-hover:bg-yellow-400 transition-colors flex items-center justify-center text-gray-600 group-hover:text-black">
                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          </div>
                          <div>
                             <p className="text-xs text-gray-500 font-bold uppercase">Work Email</p>
                             <p className="text-base font-medium text-gray-900">john.doe@techspace.io</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Floating Validated Badge */}
                 <div className="absolute top-20 -right-4 z-20 transform translate-z-20 bg-black text-white px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 animate-bounce-slow">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="font-bold text-sm">Verified Activity</span>
                 </div>
                 
                 {/* Decorative Elements */}
                 <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 transform translate-z-[-20px]"></div>
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 transform translate-z-[-20px]"></div>
              </div>
            </motion.div>
          </div>

          {/* Feature 2 - Slide from Right */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-40">
            <motion.div 
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative perspective-1000"
            >
               <div className="relative transform rotate-y-[10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out preserve-3d">
                  {/* Search Interface */}
                  <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 relative z-10 overflow-hidden">
                     {/* Search Bar */}
                     <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-6 shadow-inner">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <span className="text-gray-400 font-medium">"Dentists in Chicago"</span>
                        <div className="ml-auto bg-white px-2 py-1 rounded-md text-[10px] uppercase font-bold text-gray-400 border border-gray-200">NO WEBSITE</div>
                     </div>

                     {/* Filters */}
                     <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {['Restaurants', 'Gyms', 'Lawyers', 'Spas'].map((filter, i) => (
                           <div key={i} className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap ${i === 0 ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                              {filter}
                           </div>
                        ))}
                     </div>

                     {/* Result Items */}
                     <div className="space-y-3">
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
                           <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-gray-900">Elite Dental Care</h4>
                              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                           </div>
                           <div className="flex gap-2 text-xs font-semibold text-yellow-600 uppercase tracking-wider mb-3">
                              <span className="px-2 py-1 bg-white/50 rounded">No Website</span>
                              <span className="px-2 py-1 bg-white/50 rounded text-yellow-700">High Intent</span>
                           </div>
                           <div className="w-full h-1 bg-yellow-200 rounded-full overflow-hidden">
                              <div className="w-3/4 h-full bg-yellow-500"></div>
                           </div>
                        </div>

                        {[1, 2].map((i) => (
                           <div key={i} className="p-4 bg-white border border-gray-100 rounded-xl opacity-60">
                              <div className="h-4 w-32 bg-gray-100 rounded mb-2"></div>
                              <div className="h-3 w-16 bg-gray-50 rounded"></div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* 3D Floating Elements */}
                  <motion.div 
                     animate={{ y: [-10, 10, -10] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -right-8 top-20 z-20 bg-blue-500 text-white p-4 rounded-2xl shadow-xl transform translate-z-20 border-4 border-white"
                  >
                     <div className="text-2xl font-bold">142</div>
                     <div className="text-[10px] uppercase font-bold opacity-80">Results Found</div>
                  </motion.div>

                  <div className="absolute -left-4 -bottom-4 z-0 w-full h-full bg-gradient-to-tr from-yellow-400/20 to-transparent rounded-3xl transform translate-z-[-10px]"></div>
               </div>
            </motion.div>
            <motion.div 
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className="text-yellow-500 font-semibold text-sm tracking-widest">SMART FILTERING</span>
              <h3 className="text-2xl lg:text-5xl font-bold text-black mt-3 mb-5 leading-tight">Find The Right Leads</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our system identifies businesses that lack online presence, making them ideal prospects for your services.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Location', 'Category', 'No Website'].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Feature 3 */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="order-2 lg:order-1"
            >
              <span className="text-yellow-500 font-semibold text-sm tracking-widest">EASY EXPORT</span>
              <h3 className="text-2xl lg:text-5xl font-bold text-black mt-3 mb-5 leading-tight">Download Your Data</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Export your leads in multiple formats. Use them in your CRM, spreadsheets, or any tool you prefer.
              </p>
              <div className="flex flex-wrap gap-3">
                {['CSV', 'PDF', 'Excel'].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div 
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2 relative perspective-1000"
            >
               <div className="relative transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out preserve-3d">
                  {/* Main Card */}
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative z-10 mx-auto w-full aspect-[4/3] flex flex-col justify-center items-center">
                     
                     {/* Export Animation */}
                     <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gray-50 rounded-2xl border border-dashed border-gray-200"></div>
                        
                        {/* File Stack */}
                        <motion.div 
                           animate={{ y: [0, -10, 0] }}
                           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                           className="relative z-10 w-48 bg-white rounded-xl shadow-lg border border-gray-200 p-4 transform translate-y-[-20px]"
                        >
                           <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              </div>
                              <div>
                                 <div className="text-sm font-bold text-gray-900">Leads_Export.csv</div>
                                 <div className="text-xs text-gray-500">2.4 MB • Just now</div>
                              </div>
                           </div>
                           <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                              <motion.div 
                                 initial={{ width: "0%" }}
                                 animate={{ width: "100%" }}
                                 transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                 className="h-full bg-green-500 rounded-full"
                              />
                           </div>
                        </motion.div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-24 bg-gray-100 rounded-xl shadow transform rotate-3 -z-10 opacity-60"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-24 bg-gray-200 rounded-xl shadow transform -rotate-3 -z-20 opacity-40"></div>
                        
                        {/* Flying Icons */}
                        <motion.div 
                           animate={{ x: [0, 50, 60], y: [0, -50, -40], opacity: [0, 1, 0] }}
                           transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1] }}
                           className="absolute top-1/2 left-1/2 bg-yellow-400 p-2 rounded-lg shadow-lg z-20"
                        >
                           <span className="text-xs font-bold text-black">XLS</span>
                        </motion.div>
                        <motion.div 
                           animate={{ x: [0, -50, -60], y: [0, -30, -20], opacity: [0, 1, 0] }}
                           transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.5, 1], delay: 0.5 }}
                           className="absolute top-1/2 left-1/2 bg-black p-2 rounded-lg shadow-lg z-20"
                        >
                           <span className="text-xs font-bold text-white">PDF</span>
                        </motion.div>
                     </div>
                  </div>

                  {/* 3D Button */}
                  <motion.div 
                     whileHover={{ scale: 1.05 }}
                     className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 bg-black text-white px-8 py-4 rounded-2xl shadow-xl flex items-center gap-2 transform translate-z-30 cursor-pointer border border-gray-800"
                  >
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                     <span className="font-bold">Download List</span>
                  </motion.div>
               </div>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* ============================================ */}
      {/* HOW IT WORKS - HORIZONTAL SCROLL EFFECT */}
      {/* ============================================ */}
      <section id="how-it-works" className="py-20 lg:py-32 bg-black text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-20"
          >
            <span className="inline-block px-4 py-2 bg-yellow-400 text-black rounded-full text-sm font-semibold mb-4">
              How It Works
            </span>
            <h2 className="text-3xl lg:text-6xl font-bold tracking-tight mb-4">
              Three Simple Steps
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Start finding leads in minutes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                title: 'Enter Location',
                description: 'Specify the city or area where you want to find business leads.',
                image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop'
              },
              {
                step: '02',
                title: 'Select Category',
                description: 'Choose the type of businesses you are looking for.',
                image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop'
              },
              {
                step: '03',
                title: 'Get Leads',
                description: 'Download verified leads with complete contact details.',
                image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop'
              },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="aspect-[4/3] relative rounded-3xl overflow-hidden mb-8 border border-gray-800">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    quality={90}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="absolute top-6 left-6 w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-xl"
                  >
                    <span className="text-black font-bold text-lg">{item.step}</span>
                  </motion.div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-lg">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* INFINITE SCROLL MARQUEE - REVERSE */}
      {/* ============================================ */}
      <section className="py-8 bg-yellow-400 overflow-hidden text-black">
        <InfiniteScroll 
          items={['PHONE NUMBERS', 'ADDRESSES', 'BUSINESS DATA', 'VERIFIED LEADS', 'EXPORT']} 
          direction="right"
          speed={30}
        />
      </section>

      {/* ============================================ */}
      {/* PRICING SECTION WITH 3D CARDS */}
      {/* ============================================ */}
      <ParallaxSection id="pricing" className="py-20 lg:py-32 bg-gray-50" speed={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <motion.span variants={fadeInUp} className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold mb-4">
              Pricing
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-6xl font-bold text-black tracking-tight mb-4">
              Simple Pricing
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pay as you go. No hidden fees.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto perspective-1000">
            {PRICING_PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 60, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
                className={`relative bg-white rounded-3xl p-8 ${
                  plan.popular 
                    ? 'border-2 border-yellow-400 shadow-xl' 
                    : 'border border-gray-200 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-yellow-400 text-black text-sm font-bold rounded-full shadow-lg"
                  >
                    Most Popular
                  </motion.div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-6xl font-bold text-black">₹{plan.price}</span>
                  </div>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-50 rounded-2xl p-5 mb-8 text-center"
                >
                  <span className="text-4xl font-bold text-black">{plan.credits}</span>
                  <span className="text-gray-600 ml-2 text-lg">Credits</span>
                </motion.div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 opacity-40">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                      </div>
                      <span className="text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/auth/signin"
                    className={`block w-full py-4 text-center font-semibold rounded-full transition-all duration-300 ${
                      plan.popular
                        ? 'bg-yellow-400 text-black hover:bg-yellow-500 shadow-lg'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.p 
            variants={fadeIn} 
            className="text-center text-gray-500 mt-12 text-sm"
          >
            Credits never expire. One-time purchase.
          </motion.p>
        </div>
      </ParallaxSection>

      {/* ============================================ */}
      {/* SHOWCASE SECTION */}
      {/* ============================================ */}
      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-yellow-600 font-semibold text-sm tracking-widest">WHY CHOOSE US</span>
            <h2 className="text-3xl lg:text-6xl font-bold text-black mt-3 mb-6 tracking-tight">
              Built for Growth
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Large Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group"
            >
              <div className="aspect-square lg:aspect-auto lg:h-full relative">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                  alt="Team collaboration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">Verified Data</h3>
                  <p className="text-gray-300">Every lead is validated for accuracy</p>
                </div>
              </div>
            </motion.div>

            {/* Small Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-3xl overflow-hidden group"
            >
              <div className="aspect-square relative">
                <Image
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop"
                  alt="Instant access"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-lg font-bold text-white">Instant Access</h4>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden group"
            >
              <div className="aspect-square relative">
                <Image
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop"
                  alt="Easy export"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-lg font-bold text-white">Easy Export</h4>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden group"
            >
              <div className="aspect-square relative">
                <Image
                  src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=2073&auto=format&fit=crop"
                  alt="Support"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-lg font-bold text-white">24/7 Support</h4>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-yellow-400 rounded-3xl p-6 flex flex-col justify-center text-center group hover:bg-yellow-500 transition-colors"
            >
              <div>
                <span className="text-5xl font-bold text-black">∞</span>
                <p className="text-black font-semibold mt-2">Lifetime Credits</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FAQ SECTION WITH SMOOTH ACCORDION */}
      {/* ============================================ */}
      <ParallaxSection id="faq" className="py-20 lg:py-32 bg-gray-50" speed={0.1}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span variants={fadeInUp} className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold mb-4">
              FAQ
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-6xl font-bold text-black tracking-tight mb-4">
              Common Questions
            </motion.h2>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-300"
                >
                  <span className="font-semibold text-black pr-4 text-lg">{faq.question}</span>
                  <motion.div 
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${openFaq === index ? 'bg-yellow-400' : 'bg-gray-100'}`}
                  >
                    <span className={`text-xl leading-none font-light ${openFaq === index ? 'text-black' : 'text-gray-400'}`}>+</span>
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ 
                    height: openFaq === index ? 'auto' : 0, 
                    opacity: openFaq === index ? 1 : 0 
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="py-24 lg:py-40 bg-black text-white relative overflow-hidden">
        {/* Subtle grid instead of blobs */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Start Finding
            <br />
            <span className="text-yellow-400">New Clients</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            The easiest way to find local businesses that need your help.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center px-10 py-5 bg-yellow-400 text-black text-lg font-bold rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-xl"
              >
                Get Started Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-10 py-5 border-2 border-white/20 text-white text-lg font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                View Pricing
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
