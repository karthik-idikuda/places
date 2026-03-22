// Razorpay Configuration - LIVE KEYS
export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_SCIiG0g4gcShfD'

export interface CreditPackage {
  id: string
  name: string
  price: number
  credits: number
  pricePerCredit: number
  features: string[]
  popular?: boolean
  description: string
}

// Credit Packages - One-time purchase, NO subscriptions
// 1 Credit = 1 Lead revealed with full contact details
export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    price: 99,
    credits: 10,
    pricePerCredit: 9.9,
    description: 'Perfect for trying out',
    features: [
      '10 Credits (10 Leads)',
      'Phone Numbers Included',
      'Full Business Details',
      'Export to CSV',
      'Credits Never Expire',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Pack',
    price: 299,
    credits: 50,
    pricePerCredit: 5.98,
    popular: true,
    description: 'Best value for money',
    features: [
      '50 Credits (50 Leads)',
      'Phone Numbers Included',
      'Full Business Details',
      'Export to CSV & Excel',
      'Credits Never Expire',
      '40% Savings',
    ],
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    price: 499,
    credits: 100,
    pricePerCredit: 4.99,
    description: 'For serious professionals',
    features: [
      '100 Credits (100 Leads)',
      'Phone Numbers Included',
      'Full Business Details',
      'All Export Formats',
      'Credits Never Expire',
      '50% Savings',
      'Priority Support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    price: 999,
    credits: 250,
    pricePerCredit: 3.99,
    description: 'Maximum volume & savings',
    features: [
      '250 Credits (250 Leads)',
      'Phone Numbers Included',
      'Full Business Details',
      'All Export Formats',
      'Credits Never Expire',
      '60% Savings',
      'Priority Support',
      'Bulk Operations',
    ],
  },
]

// Legacy export for backward compatibility
export const PRICING_PLANS = CREDIT_PACKAGES.map(pkg => ({
  id: pkg.id,
  name: pkg.name,
  price: pkg.price,
  leads: pkg.credits,
  features: pkg.features,
  popular: pkg.popular,
  description: pkg.description,
}))

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
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
