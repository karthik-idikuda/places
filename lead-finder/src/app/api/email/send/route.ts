import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create transporter - using Gmail SMTP
// For production, configure environment variables
const createTransporter = () => {
  // Check if we have SMTP credentials
  const user = process.env.SMTP_USER || process.env.EMAIL_USER
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS
  
  if (!user || !pass) {
    console.warn('Email credentials not configured. Emails will be logged but not sent.')
    return null
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, text } = await request.json()

    if (!to || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject' },
        { status: 400 }
      )
    }

    const transporter = createTransporter()
    
    // If no transporter (credentials not configured), log and return success
    if (!transporter) {
      console.log('📧 Email would be sent to:', to)
      console.log('📧 Subject:', subject)
      console.log('📧 Body (text):', text?.substring(0, 200) + '...')
      
      return NextResponse.json({
        success: true,
        message: 'Email logged (SMTP not configured)',
        logged: true,
      })
    }

    // Send email
    const mailOptions = {
      from: {
        name: 'SmartLeadTool',
        address: process.env.SMTP_USER || process.env.EMAIL_USER || 'noreply@smartleadtool.com',
      },
      to,
      subject,
      html,
      text,
    }

    const info = await transporter.sendMail(mailOptions)

    console.log('✅ Email sent:', info.messageId)

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
