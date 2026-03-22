'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function AddCreditsPage() {
  const { user, profile } = useAuth()
  const [status, setStatus] = useState('')
  const [adding, setAdding] = useState(false)

  const addCredits = async () => {
    if (!user) {
      setStatus('Please sign in first')
      return
    }

    setAdding(true)
    setStatus('Adding credits...')
    
    try {
      const userRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userRef)
      
      const currentCredits = userDoc.exists() ? (userDoc.data().credits || 0) : 0
      const newCredits = currentCredits + 10
      
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        credits: newCredits,
        lastLoginAt: serverTimestamp(),
        ...(userDoc.exists() ? {} : { 
          createdAt: serverTimestamp(),
          totalLeadsGenerated: 0,
          subscription: 'free'
        })
      }, { merge: true })
      
      setStatus(`✅ SUCCESS! Added 10 credits. New balance: ${newCredits}`)
      // profile update happens automatically via onSnapshot
    } catch (error: any) {
      console.error('Error:', error)
      setStatus('Error: ' + error.message)
    }
    setAdding(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">Add Credits - Admin Tool</h1>
      
      {user ? (
        <div className="text-center">
          <p className="mb-4">Logged in as: {user.email}</p>
          <p className="mb-4">User ID: {user.uid}</p>
          <p className="mb-4">Current Credits: {profile?.credits || 0}</p>
          
          <button
            onClick={addCredits}
            disabled={adding}
            className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-400 disabled:opacity-50"
          >
            {adding ? 'Adding...' : 'Add 10 Credits'}
          </button>
          
          {status && (
            <p className="mt-6 text-xl">{status}</p>
          )}
          
          <a href="/dashboard" className="block mt-8 text-yellow-400 underline">
            Go to Dashboard
          </a>
        </div>
      ) : (
        <div>
          <p>Please sign in first</p>
          <a href="/auth/signin" className="text-yellow-400 underline">Sign In</a>
        </div>
      )}
    </div>
  )
}
