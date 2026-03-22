// Email Service for SmartLeadTool
// Uses API route to send transactional emails

export interface EmailData {
  to: string
  subject: string
  type: 'welcome' | 'login' | 'logout' | 'purchase' | 'credits_added' | 'password_reset'
  data?: {
    name?: string
    credits?: number
    amount?: number
    packageName?: string
    orderId?: string
    date?: string
  }
}

// Email templates
const getEmailTemplate = (type: EmailData['type'], data: EmailData['data'] = {}) => {
  const logoUrl = 'https://smartleadtool.com/logo.svg'
  const brandColor = '#FACC15'
  
  const baseStyles = `
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
      .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
      .header { background: #000; padding: 30px; text-align: center; }
      .logo { width: 60px; height: 60px; }
      .brand { color: white; font-size: 24px; font-weight: bold; margin-top: 15px; }
      .content { padding: 40px 30px; }
      .title { font-size: 28px; font-weight: bold; color: #000; margin-bottom: 20px; }
      .text { color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
      .highlight { background: linear-gradient(135deg, ${brandColor} 0%, #fbbf24 100%); color: #000; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0; }
      .highlight-title { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8; }
      .highlight-value { font-size: 36px; font-weight: bold; }
      .button { display: inline-block; background: #000; color: white; padding: 15px 30px; border-radius: 30px; text-decoration: none; font-weight: bold; margin: 20px 0; }
      .footer { background: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #eee; }
      .footer-text { color: #999; font-size: 12px; }
      .info-box { background: #f5f5f5; padding: 20px; border-radius: 12px; margin: 20px 0; }
      .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
      .info-row:last-child { border-bottom: none; }
      .info-label { color: #666; }
      .info-value { font-weight: bold; color: #000; }
    </style>
  `
  
  const header = `
    <div class="header">
      <img src="${logoUrl}" alt="SmartLeadTool" class="logo" onerror="this.style.display='none'">
      <div class="brand">SmartLeadTool</div>
    </div>
  `
  
  const footer = `
    <div class="footer">
      <p class="footer-text">© ${new Date().getFullYear()} SmartLeadTool. All rights reserved.</p>
      <p class="footer-text">This is an automated email. Please do not reply.</p>
      <p class="footer-text">Contact: idikudakarthik55@gmail.com</p>
    </div>
  `
  
  switch (type) {
    case 'welcome':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyles}</head>
        <body>
          <div class="container">
            ${header}
            <div class="content">
              <h1 class="title">Welcome to SmartLeadTool! 🎉</h1>
              <p class="text">Hi ${data.name || 'there'},</p>
              <p class="text">Thank you for joining SmartLeadTool! We're excited to help you find quality business leads.</p>
              <p class="text">With SmartLeadTool, you can:</p>
              <ul class="text">
                <li>Find businesses without websites</li>
                <li>Get verified phone numbers and contact details</li>
                <li>Export leads to CSV and Excel</li>
                <li>Search across 100+ cities in India</li>
              </ul>
              <div class="highlight">
                <div class="highlight-title">Get Started</div>
                <div class="highlight-value">Buy Credits Now</div>
              </div>
              <p class="text">Purchase credits to start finding leads. Your credits never expire!</p>
              <a href="https://smartleadtool.com/pricing" class="button">View Credit Packages →</a>
            </div>
            ${footer}
          </div>
        </body>
        </html>
      `
    
    case 'login':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyles}</head>
        <body>
          <div class="container">
            ${header}
            <div class="content">
              <h1 class="title">Login Notification 🔐</h1>
              <p class="text">Hi ${data.name || 'there'},</p>
              <p class="text">We noticed a new login to your SmartLeadTool account.</p>
              <div class="info-box">
                <div class="info-row">
                  <span class="info-label">Date & Time</span>
                  <span class="info-value">${data.date || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
                </div>
              </div>
              <p class="text">If this was you, no action is needed. If you didn't log in, please secure your account immediately.</p>
              <a href="https://smartleadtool.com/dashboard" class="button">Go to Dashboard →</a>
            </div>
            ${footer}
          </div>
        </body>
        </html>
      `
    
    case 'purchase':
    case 'credits_added':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyles}</head>
        <body>
          <div class="container">
            ${header}
            <div class="content">
              <h1 class="title">Payment Successful! ✅</h1>
              <p class="text">Hi ${data.name || 'there'},</p>
              <p class="text">Thank you for your purchase! Your credits have been added to your account.</p>
              <div class="highlight">
                <div class="highlight-title">Credits Added</div>
                <div class="highlight-value">+${data.credits || 0} Credits</div>
              </div>
              <div class="info-box">
                <div class="info-row">
                  <span class="info-label">Package</span>
                  <span class="info-value">${data.packageName || 'Credit Pack'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Amount Paid</span>
                  <span class="info-value">₹${data.amount || 0}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Order ID</span>
                  <span class="info-value">${data.orderId || '-'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Date</span>
                  <span class="info-value">${data.date || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
                </div>
              </div>
              <p class="text"><strong>Note:</strong> Your credits never expire and are non-refundable. Start using them to find quality leads!</p>
              <a href="https://smartleadtool.com/search" class="button">Start Finding Leads →</a>
            </div>
            ${footer}
          </div>
        </body>
        </html>
      `
    
    case 'logout':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyles}</head>
        <body>
          <div class="container">
            ${header}
            <div class="content">
              <h1 class="title">Logged Out Successfully 👋</h1>
              <p class="text">Hi ${data.name || 'there'},</p>
              <p class="text">You have been successfully logged out of SmartLeadTool.</p>
              <p class="text">Your account and credits are safe. Come back anytime to continue finding leads!</p>
              <a href="https://smartleadtool.com/auth/signin" class="button">Login Again →</a>
            </div>
            ${footer}
          </div>
        </body>
        </html>
      `
    
    default:
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyles}</head>
        <body>
          <div class="container">
            ${header}
            <div class="content">
              <h1 class="title">SmartLeadTool Notification</h1>
              <p class="text">Hi ${data.name || 'there'},</p>
              <p class="text">This is a notification from SmartLeadTool.</p>
              <a href="https://smartleadtool.com/dashboard" class="button">Go to Dashboard →</a>
            </div>
            ${footer}
          </div>
        </body>
        </html>
      `
  }
}

// Get plain text version for email
const getPlainText = (type: EmailData['type'], data: EmailData['data'] = {}) => {
  switch (type) {
    case 'welcome':
      return `Welcome to SmartLeadTool, ${data.name || 'there'}!\n\nThank you for joining us. Purchase credits to start finding quality business leads.\n\nVisit: https://smartleadtool.com/pricing`
    case 'login':
      return `Login Notification\n\nHi ${data.name || 'there'}, we noticed a login to your account on ${data.date || new Date().toLocaleString()}.`
    case 'purchase':
    case 'credits_added':
      return `Payment Successful!\n\nHi ${data.name || 'there'}, your payment of ₹${data.amount} for ${data.credits} credits was successful.\n\nOrder ID: ${data.orderId}\n\nStart finding leads: https://smartleadtool.com/search`
    case 'logout':
      return `You have been logged out of SmartLeadTool. Your account and credits are safe.`
    default:
      return 'Notification from SmartLeadTool'
  }
}

// Send email via API
export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: emailData.to,
        subject: emailData.subject,
        html: getEmailTemplate(emailData.type, emailData.data),
        text: getPlainText(emailData.type, emailData.data),
      }),
    })
    
    if (!response.ok) {
      console.error('Failed to send email:', await response.text())
      return false
    }
    
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

// Helper functions for common email types
export const sendWelcomeEmail = (to: string, name: string) => 
  sendEmail({ to, subject: 'Welcome to SmartLeadTool! 🎉', type: 'welcome', data: { name } })

export const sendLoginEmail = (to: string, name: string) =>
  sendEmail({ to, subject: 'New Login to Your SmartLeadTool Account', type: 'login', data: { name, date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) } })

export const sendLogoutEmail = (to: string, name: string) =>
  sendEmail({ to, subject: 'Logged Out of SmartLeadTool', type: 'logout', data: { name } })

export const sendPurchaseEmail = (to: string, data: { name: string, credits: number, amount: number, packageName: string, orderId: string }) =>
  sendEmail({ to, subject: `Payment Successful - ${data.credits} Credits Added! ✅`, type: 'purchase', data: { ...data, date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) } })
