'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'
import { 
  UserProfile, 
  createOrUpdateUserProfile, 
  subscribeToUserProfile,
  trackSearchActivity,
  trackPaymentAndAddCredits,
  trackLeadView,
  useCredit
} from '@/lib/userService'
import { saveSearchHistory } from '@/lib/firebaseServices'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  // Actions
  logSearch: (query: string, location: string) => Promise<void>
  logPayment: (amount: number, credits: number) => Promise<void>
  logLeadView: () => Promise<void>
  consumeCredit: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true)
      
      if (firebaseUser) {
        setUser(firebaseUser)
        
        try {
          // Sync with Firestore (Create/Update)
          await createOrUpdateUserProfile(firebaseUser.uid, {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL
          });

          // Real-time listener
          unsubscribeProfile = subscribeToUserProfile(firebaseUser.uid, (userProfile) => {
            setProfile(userProfile)
            setLoading(false)
          })
        } catch (error) {
          console.error("Error setting up user profile:", error)
          setLoading(false)
        }
      } else {
        setUser(null)
        setProfile(null)
        setLoading(false)
        if (unsubscribeProfile) {
          unsubscribeProfile()
        }
      }
    })

    return () => {
      unsubscribeAuth()
      if (unsubscribeProfile) {
        unsubscribeProfile()
      }
    }
  }, [])

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  // Activity Tracking Helpers
  const logSearch = async (query: string, location: string) => {
    if (user) {
      await trackSearchActivity(user.uid, query, location);
      await saveSearchHistory({ 
        userId: user.uid, 
        query, 
        location, 
        category: 'All', 
        resultsCount: 0, 
        leadsFound: 0 
      });
    }
  };

  const logPayment = async (amount: number, credits: number) => {
    if (user) await trackPaymentAndAddCredits(user.uid, amount, credits);
  };

  const logLeadView = async () => {
    if (user) await trackLeadView(user.uid);
  };

  const consumeCredit = async (): Promise<boolean> => {
    if (user && profile && profile.credits > 0) {
      await useCredit(user.uid);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        profile, 
        loading, 
        signInWithGoogle, 
        signOut,
        logSearch,
        logPayment,
        logLeadView,
        consumeCredit
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
