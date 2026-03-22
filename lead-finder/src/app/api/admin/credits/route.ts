import { NextRequest, NextResponse } from 'next/server'
import { doc, updateDoc, increment, getDoc, collection, getDocs, query, where, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

// Admin endpoint to manually add credits (for fixing payment issues)
export async function POST(request: NextRequest) {
  try {
    const { userId, email, credits, adminKey } = await request.json()

    // Simple admin key check (you should use a more secure method in production)
    if (adminKey !== 'smartlead_admin_2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if ((!userId && !email) || !credits) {
      return NextResponse.json({ error: 'Missing userId/email or credits' }, { status: 400 })
    }

    let userDocRef;
    let userDocSnap;

    // If email provided, find user by email
    if (email && !userId) {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('email', '==', email))
      const querySnapshot = await getDocs(q)
      
      if (querySnapshot.empty) {
        // Create user if not exists
        const newUserId = email.replace(/[^a-zA-Z0-9]/g, '_')
        userDocRef = doc(db, 'users', newUserId)
        await setDoc(userDocRef, {
          uid: newUserId,
          email: email,
          displayName: email.split('@')[0],
          photoURL: null,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          credits: credits,
          totalLeadsGenerated: 0,
          subscription: 'free',
        })
        return NextResponse.json({
          success: true,
          message: `Created user and added ${credits} credits`,
          newCredits: credits
        })
      }
      
      userDocSnap = querySnapshot.docs[0]
      userDocRef = userDocSnap.ref
    } else {
      userDocRef = doc(db, 'users', userId)
      userDocSnap = await getDoc(userDocRef)

      if (!userDocSnap.exists()) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
    }

    const currentCredits = userDocSnap.data()?.credits || 0

    await updateDoc(userDocRef, {
      credits: increment(credits)
    })

    return NextResponse.json({
      success: true,
      message: `Added ${credits} credits`,
      previousCredits: currentCredits,
      newCredits: currentCredits + credits
    })
  } catch (error: any) {
    console.error('Error adding credits:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET to list all users (admin only)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const adminKey = searchParams.get('adminKey')

  if (adminKey !== 'smartlead_admin_2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { collection, getDocs } = await import('firebase/firestore')
    const usersSnapshot = await getDocs(collection(db, 'users'))
    
    const users = usersSnapshot.docs.map(doc => ({
      uid: doc.id,
      email: doc.data().email,
      credits: doc.data().credits,
      displayName: doc.data().displayName
    }))

    return NextResponse.json({ users })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
