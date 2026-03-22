import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

// Initialize Razorpay only when actually needed
function getRazorpayInstance() {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  const key_secret = process.env.RAZORPAY_KEY_SECRET

  console.log('Razorpay Key ID:', key_id ? `${key_id.substring(0, 10)}...` : 'NOT SET')
  console.log('Razorpay Secret:', key_secret ? 'SET' : 'NOT SET')

  if (!key_id || !key_secret) {
    throw new Error('Razorpay credentials not configured')
  }

  return new Razorpay({
    key_id,
    key_secret,
  })
}

export async function POST(request: NextRequest) {
  console.log('=== CREATE ORDER API CALLED ===')
  
  try {
    const body = await request.json()
    console.log('Request body:', body)
    
    const { amount, planId, userId, userEmail } = body

    if (!amount || !planId || !userId) {
      console.log('Missing fields - amount:', amount, 'planId:', planId, 'userId:', userId)
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('Creating Razorpay instance...')
    const razorpay = getRazorpayInstance()

    console.log('Creating order with amount:', amount * 100, 'paise')
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        planId,
        userId,
        userEmail: userEmail || '',
      },
    })

    console.log('Order created successfully:', order.id)
    
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error: any) {
    console.error('=== RAZORPAY ERROR ===')
    console.error('Error message:', error.message)
    console.error('Error details:', error)
    
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    )
  }
}
