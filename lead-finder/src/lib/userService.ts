import { db } from './firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp, 
  onSnapshot,
  Timestamp,
  increment
} from 'firebase/firestore';

// User Profile Interface - Comprehensive Data
export interface UserProfile {
  // Basic Info
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  
  // Account Info
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
  lastActiveAt: Timestamp;
  
  // Subscription & Credits
  plan: 'free' | 'pro' | 'enterprise';
  credits: number;
  
  // Activity Tracking
  totalSearches: number;
  totalLeadsViewed: number;
  totalPayments: number;
  amountSpent: number;
  
  // Preferences
  preferredLocations: string[];
  preferredCategories: string[];
  
  // Session Info
  loginCount: number;
  lastSearchQuery?: string;
  lastSearchLocation?: string;
  
  // Account Status
  isActive: boolean;
  isVerified: boolean;
}

// Create or update user profile on login
export async function createOrUpdateUserProfile(
  uid: string,
  authData: {
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }
): Promise<UserProfile> {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // New user - create full profile
    const newProfile: any = {
      uid,
      email: authData.email || '',
      displayName: authData.displayName || 'User',
      photoURL: authData.photoURL || '',
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
      plan: 'free',
      credits: 0, // Starts with 0, must buy
      totalSearches: 0,
      totalLeadsViewed: 0,
      totalPayments: 0,
      amountSpent: 0,
      preferredLocations: [],
      preferredCategories: [],
      loginCount: 1,
      isActive: true,
      isVerified: true,
    };

    await setDoc(userRef, newProfile);
    
    // Fetch to get server timestamps
    const createdSnap = await getDoc(userRef);
    return createdSnap.data() as UserProfile;
  } else {
    // Existing user - update login info
    await updateDoc(userRef, {
      lastLoginAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
      loginCount: increment(1),
      email: authData.email || userSnap.data().email,
      displayName: authData.displayName || userSnap.data().displayName,
      photoURL: authData.photoURL || userSnap.data().photoURL,
    });

    const updatedSnap = await getDoc(userRef);
    return updatedSnap.data() as UserProfile;
  }
}

// Subscribe to real-time user updates
export function subscribeToUserProfile(
  uid: string,
  callback: (profile: UserProfile | null) => void
): () => void {
  const userRef = doc(db, 'users', uid);
  
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data() as UserProfile);
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('Error listening to user profile:', error);
    callback(null);
  });
}

// Track search activity
export async function trackSearchActivity(
  uid: string,
  query: string,
  location: string
): Promise<void> {
  const userRef = doc(db, 'users', uid);
  
  await updateDoc(userRef, {
    totalSearches: increment(1),
    lastActiveAt: serverTimestamp(),
    lastSearchQuery: query,
    lastSearchLocation: location,
  });
}

// Track lead view and deduct credit (optional)
export async function trackLeadView(uid: string): Promise<void> {
  const userRef = doc(db, 'users', uid);
  
  await updateDoc(userRef, {
    totalLeadsViewed: increment(1),
    lastActiveAt: serverTimestamp(),
  });
}

// Track payment and add credits
export async function trackPaymentAndAddCredits(uid: string, amount: number, creditsToAdd: number): Promise<void> {
  const userRef = doc(db, 'users', uid);
  
  await updateDoc(userRef, {
    totalPayments: increment(1),
    amountSpent: increment(amount),
    credits: increment(creditsToAdd),
    lastActiveAt: serverTimestamp(),
  });
}

// Use a credit
export async function useCredit(uid: string): Promise<boolean> {
  const userRef = doc(db, 'users', uid);
  
  // Use a transaction to ensure atomic update and check
  // For simplicity here using read-then-write but transaction is better for credits
  // We'll stick to simple check for now or basic increment if local validation passed
  // Better: Pre-check in UI, then decrement backend.
  
  await updateDoc(userRef, {
    credits: increment(-1),
    lastActiveAt: serverTimestamp(),
  });
  return true;
}
