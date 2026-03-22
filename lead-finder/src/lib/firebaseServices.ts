import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  increment,
  serverTimestamp,
  addDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'

// ============================================
// USER SERVICES
// ============================================

export interface UserData {
  uid: string
  email: string | null
  displayName: string | null
  name?: string | null
  photoURL: string | null
  createdAt: any
  lastLoginAt: any
  credits: number
  totalLeadsGenerated: number
  subscription: string | null
  subscriptionEndDate?: any
  phone?: string | null
  company?: string | null
  industry?: string | null
}

export const createOrUpdateUser = async (user: any): Promise<UserData> => {
  const userRef = doc(db, 'users', user.uid)
  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) {
    const newUserData: UserData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      credits: 0, // No free credits - users need to purchase
      totalLeadsGenerated: 0,
      subscription: 'free',
    }
    await setDoc(userRef, newUserData)
    return newUserData
  } else {
    await updateDoc(userRef, { lastLoginAt: serverTimestamp() })
    return userDoc.data() as UserData
  }
}

export const getUserData = async (uid: string): Promise<UserData | null> => {
  const userDoc = await getDoc(doc(db, 'users', uid))
  if (userDoc.exists()) {
    return userDoc.data() as UserData
  }
  return null
}

export const updateUserCredits = async (uid: string, creditChange: number): Promise<void> => {
  const userRef = doc(db, 'users', uid)
  await updateDoc(userRef, {
    credits: increment(creditChange),
  })
}

export const updateUserProfile = async (uid: string, data: Partial<UserData>): Promise<void> => {
  const userRef = doc(db, 'users', uid)
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// ============================================
// LEAD SERVICES
// ============================================

export interface Lead {
  id?: string
  userId: string
  name: string
  phone: string
  address: string
  category: string
  rating?: number
  totalRatings?: number
  placeId: string
  hasWebsite: boolean
  website?: string
  location?: {
    lat: number
    lng: number
  }
  searchQuery: string
  searchLocation: string
  createdAt: any
  notes?: string
  status: 'new' | 'contacted' | 'converted' | 'not-interested'
  aiPitch?: string
}

export const saveLead = async (lead: Omit<Lead, 'id' | 'createdAt'>): Promise<string> => {
  const leadsRef = collection(db, 'leads')
  const docRef = await addDoc(leadsRef, {
    ...lead,
    createdAt: serverTimestamp(),
  })
  
  // Update user's total leads generated
  await updateDoc(doc(db, 'users', lead.userId), {
    totalLeadsGenerated: increment(1),
  })
  
  return docRef.id
}

export const saveMultipleLeads = async (leads: Omit<Lead, 'id' | 'createdAt'>[]): Promise<string[]> => {
  const savedIds: string[] = []
  
  for (const lead of leads) {
    const id = await saveLead(lead)
    savedIds.push(id)
  }
  
  return savedIds
}

export const getUserLeads = async (userId: string, limitCount: number = 50): Promise<Lead[]> => {
  try {
    const leadsRef = collection(db, 'leads')
    const q = query(
      leadsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
    
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Lead[]
  } catch (error) {
    console.error('Error getting user leads:', error)
    // If index error, try without ordering
    try {
      const leadsRef = collection(db, 'leads')
      const q = query(
        leadsRef,
        where('userId', '==', userId),
        limit(limitCount)
      )
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[]
    } catch (e) {
      console.error('Fallback query failed:', e)
      return []
    }
  }
}

export const updateLeadStatus = async (leadId: string, status: Lead['status']): Promise<void> => {
  const leadRef = doc(db, 'leads', leadId)
  await updateDoc(leadRef, { 
    status,
    updatedAt: serverTimestamp()
  })
}

export const updateLeadNotes = async (leadId: string, notes: string): Promise<void> => {
  const leadRef = doc(db, 'leads', leadId)
  await updateDoc(leadRef, { 
    notes,
    updatedAt: serverTimestamp()
  })
}

export const deleteLead = async (leadId: string): Promise<void> => {
  await deleteDoc(doc(db, 'leads', leadId))
}

// ============================================
// SEARCH HISTORY SERVICES
// ============================================

export interface SearchHistory {
  id?: string
  userId: string
  query: string
  location: string
  category: string
  resultsCount: number
  leadsFound: number
  createdAt: any
}

export const saveSearchHistory = async (search: Omit<SearchHistory, 'id' | 'createdAt'>): Promise<string> => {
  const searchRef = collection(db, 'searchHistory')
  const docRef = await addDoc(searchRef, {
    ...search,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export const getUserSearchHistory = async (userId: string, limitCount: number = 20): Promise<SearchHistory[]> => {
  try {
    const searchRef = collection(db, 'searchHistory')
    const q = query(
      searchRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
    
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as SearchHistory[]
  } catch (error) {
    console.error('Error getting user search history:', error)
    // Try without ordering
    try {
      const searchRef = collection(db, 'searchHistory')
      const q = query(
        searchRef,
        where('userId', '==', userId),
        limit(limitCount)
      )
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SearchHistory[]
    } catch (e) {
      console.error('Fallback query failed:', e)
      return []
    }
  }
}

// ============================================
// PAYMENT SERVICES
// ============================================

export interface Payment {
  id?: string
  userId: string
  orderId: string
  paymentId?: string
  amount: number
  currency: string
  credits: number
  plan: string
  status: 'created' | 'paid' | 'failed' | 'refunded'
  createdAt: any
  paidAt?: any
  razorpaySignature?: string
}

export const createPaymentRecord = async (payment: Omit<Payment, 'id' | 'createdAt'>): Promise<string> => {
  const paymentsRef = collection(db, 'payments')
  const docRef = await addDoc(paymentsRef, {
    ...payment,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export const updatePaymentStatus = async (
  orderId: string, 
  paymentId: string, 
  status: Payment['status'],
  signature?: string
): Promise<void> => {
  const paymentsRef = collection(db, 'payments')
  const q = query(paymentsRef, where('orderId', '==', orderId))
  const snapshot = await getDocs(q)
  
  if (!snapshot.empty) {
    const paymentDoc = snapshot.docs[0]
    await updateDoc(paymentDoc.ref, {
      status,
      paymentId,
      razorpaySignature: signature,
      paidAt: status === 'paid' ? serverTimestamp() : null,
    })
    
    // If payment successful, add credits to user
    if (status === 'paid') {
      const paymentData = paymentDoc.data() as Payment
      await updateUserCredits(paymentData.userId, paymentData.credits)
      
      // Update subscription if it's a plan purchase
      if (paymentData.plan !== 'credits') {
        const endDate = new Date()
        endDate.setMonth(endDate.getMonth() + 1) // 1 month subscription
        
        await updateDoc(doc(db, 'users', paymentData.userId), {
          subscription: paymentData.plan,
          subscriptionEndDate: Timestamp.fromDate(endDate),
        })
      }
    }
  }
}

export const getUserPayments = async (userId: string, limitCount: number = 20): Promise<Payment[]> => {
  try {
    const paymentsRef = collection(db, 'payments')
    const q = query(
      paymentsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
    
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Payment[]
  } catch (error) {
    console.error('Error getting user payments:', error)
    // Try without ordering
    try {
      const paymentsRef = collection(db, 'payments')
      const q = query(
        paymentsRef,
        where('userId', '==', userId),
        limit(limitCount)
      )
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Payment[]
    } catch (e) {
      console.error('Fallback query failed:', e)
      return []
    }
  }
}

// ============================================
// NOTIFICATION SERVICES
// ============================================

export interface Notification {
  id?: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: any
  link?: string
}

export const createNotification = async (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<string> => {
  const notificationsRef = collection(db, 'notifications')
  const docRef = await addDoc(notificationsRef, {
    ...notification,
    read: false,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export const getUserNotifications = async (userId: string, limitCount: number = 20): Promise<Notification[]> => {
  const notificationsRef = collection(db, 'notifications')
  const q = query(
    notificationsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )
  
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Notification[]
}

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  const notificationRef = doc(db, 'notifications', notificationId)
  await updateDoc(notificationRef, { read: true })
}

export const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
  const notificationsRef = collection(db, 'notifications')
  const q = query(notificationsRef, where('userId', '==', userId), where('read', '==', false))
  const snapshot = await getDocs(q)
  
  const updates = snapshot.docs.map(doc => updateDoc(doc.ref, { read: true }))
  await Promise.all(updates)
}

// ============================================
// STATS SERVICES
// ============================================

export interface UserStats {
  totalLeads: number
  totalSearches: number
  creditsUsed: number
  leadsThisMonth: number
  searchesThisMonth: number
}

export const getUserStats = async (userId: string): Promise<UserStats> => {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    // Get total leads
    const leadsRef = collection(db, 'leads')
    const leadsQuery = query(leadsRef, where('userId', '==', userId))
    const leadsSnapshot = await getDocs(leadsQuery)
    
    // Get total searches
    const searchRef = collection(db, 'searchHistory')
    const searchQuery = query(searchRef, where('userId', '==', userId))
    const searchSnapshot = await getDocs(searchQuery)
    
    // Get user data for credits info
    const userData = await getUserData(userId)
    
    // Calculate this month's leads and searches from fetched data
    let leadsThisMonth = 0
    let searchesThisMonth = 0
    
    leadsSnapshot.docs.forEach(doc => {
      const data = doc.data()
      if (data.createdAt && data.createdAt.toDate) {
        const createdDate = data.createdAt.toDate()
        if (createdDate >= startOfMonth) {
          leadsThisMonth++
        }
      }
    })
    
    searchSnapshot.docs.forEach(doc => {
      const data = doc.data()
      if (data.createdAt && data.createdAt.toDate) {
        const createdDate = data.createdAt.toDate()
        if (createdDate >= startOfMonth) {
          searchesThisMonth++
        }
      }
    })
    
    return {
      totalLeads: leadsSnapshot.size,
      totalSearches: searchSnapshot.size,
      creditsUsed: userData?.totalLeadsGenerated || 0,
      leadsThisMonth,
      searchesThisMonth,
    }
  } catch (error) {
    console.error('Error getting user stats:', error)
    // Return default stats on error
    return {
      totalLeads: 0,
      totalSearches: 0,
      creditsUsed: 0,
      leadsThisMonth: 0,
      searchesThisMonth: 0,
    }
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const formatTimestamp = (timestamp: any): string => {
  if (!timestamp) return 'N/A'
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const getRelativeTime = (timestamp: any): string => {
  if (!timestamp) return 'N/A'
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
