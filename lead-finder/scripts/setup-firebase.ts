/**
 * Firebase Database Setup Script
 * Professional A-Z Backend Configuration
 * 
 * This script initializes the complete Firebase backend including:
 * - Firestore collections with proper structure
 * - Security rules
 * - Composite indexes
 * - Sample data for testing
 * 
 * Usage: npx ts-node scripts/setup-firebase.ts
 */

import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';

// Configuration
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'gen-lang-client-0976545577';

// Initialize Firebase Admin (uses default credentials or service account)
let app;
try {
  app = initializeApp({
    projectId: PROJECT_ID,
  });
} catch (error) {
  console.log('Firebase already initialized');
}

const db = getFirestore();

// Collection Schemas
const COLLECTIONS = {
  users: 'users',
  leads: 'leads',
  searches: 'searches',
  transactions: 'transactions',
  notifications: 'notifications',
  analytics: 'analytics',
  settings: 'settings',
  apiLogs: 'apiLogs',
  feedback: 'feedback',
  exports: 'exports',
};

// User Schema
interface UserDocument {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  credits: number;
  totalCreditsUsed: number;
  totalLeadsRevealed: number;
  totalSearches: number;
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  planExpiry: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt: Timestamp;
  preferences: {
    emailNotifications: boolean;
    darkMode: boolean;
    defaultLocation: string | null;
    timezone: string;
  };
  metadata: {
    source: string;
    referralCode: string | null;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
  };
  status: 'active' | 'suspended' | 'deleted';
}

// Lead Schema
interface LeadDocument {
  id: string;
  userId: string;
  placeId: string;
  name: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string | null;
  category: string;
  subcategories: string[];
  rating: number | null;
  totalRatings: number | null;
  priceLevel: number | null;
  hasWebsite: boolean;
  website: string | null;
  socialMedia: {
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
    linkedin: string | null;
  };
  businessHours: object | null;
  photos: string[];
  searchQuery: string;
  searchLocation: string;
  status: 'new' | 'contacted' | 'interested' | 'not_interested' | 'converted' | 'archived';
  notes: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  contactedAt: Timestamp | null;
  followUpAt: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Transaction Schema
interface TransactionDocument {
  id: string;
  userId: string;
  userEmail: string;
  type: 'credit_purchase' | 'credit_deduction' | 'refund' | 'bonus';
  amount: number;
  currency: string;
  credits: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'razorpay' | 'stripe' | 'paypal' | 'admin';
  paymentId: string | null;
  orderId: string | null;
  signature: string | null;
  packageName: string | null;
  description: string;
  metadata: object;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Search History Schema
interface SearchDocument {
  id: string;
  userId: string;
  query: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  categories: string[];
  filters: {
    noWebsite: boolean;
    minRating: number | null;
    maxRating: number | null;
    priceLevel: number | null;
  };
  resultsCount: number;
  leadsFound: number;
  leadsRevealed: number;
  searchType: 'manual' | 'ai';
  aiAnalysis: object | null;
  duration: number;
  createdAt: Timestamp;
}

// Notification Schema
interface NotificationDocument {
  id: string;
  userId: string;
  type: 'system' | 'payment' | 'lead' | 'promo' | 'alert';
  title: string;
  message: string;
  data: object | null;
  read: boolean;
  readAt: Timestamp | null;
  createdAt: Timestamp;
}

// Analytics Schema
interface AnalyticsDocument {
  id: string;
  date: string;
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  totalSearches: number;
  totalLeadsRevealed: number;
  totalRevenue: number;
  topCategories: { name: string; count: number }[];
  topLocations: { name: string; count: number }[];
  conversionRate: number;
}

async function setupCollections() {
  console.log('Setting up Firestore collections...\n');

  // 1. Create system settings document
  console.log('1. Creating system settings...');
  await db.collection(COLLECTIONS.settings).doc('system').set({
    appName: 'SmartLead Tool',
    appVersion: '1.0.0',
    maintenanceMode: false,
    creditsPerSearch: 0,
    creditsPerReveal: 1,
    maxFreeCredits: 0,
    defaultPlan: 'free',
    supportEmail: 'support@smartleadtool.com',
    pricingPlans: {
      starter: { credits: 10, price: 99, currency: 'INR' },
      professional: { credits: 50, price: 399, currency: 'INR' },
      enterprise: { credits: 200, price: 999, currency: 'INR' },
    },
    features: {
      aiSearch: true,
      exportCSV: true,
      emailNotifications: true,
      apiAccess: false,
    },
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  console.log('   System settings created.\n');

  // 2. Create analytics counters
  console.log('2. Creating analytics counters...');
  await db.collection(COLLECTIONS.settings).doc('counters').set({
    totalUsers: 0,
    totalSearches: 0,
    totalLeadsRevealed: 0,
    totalRevenue: 0,
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  console.log('   Analytics counters created.\n');

  // 3. Create rate limiting config
  console.log('3. Creating rate limiting config...');
  await db.collection(COLLECTIONS.settings).doc('rateLimits').set({
    searchesPerMinute: 10,
    searchesPerHour: 100,
    searchesPerDay: 500,
    revealsPerMinute: 20,
    revealsPerHour: 200,
    apiCallsPerMinute: 60,
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  console.log('   Rate limiting config created.\n');

  // 4. Create categories reference
  console.log('4. Creating categories reference...');
  await db.collection(COLLECTIONS.settings).doc('categories').set({
    list: [
      { id: 'restaurant', name: 'Restaurants', query: 'restaurant', icon: 'utensils' },
      { id: 'cafe', name: 'Cafes', query: 'cafe', icon: 'coffee' },
      { id: 'salon', name: 'Beauty Salons', query: 'beauty salon', icon: 'scissors' },
      { id: 'gym', name: 'Gyms & Fitness', query: 'gym fitness', icon: 'dumbbell' },
      { id: 'retail', name: 'Retail Stores', query: 'retail store', icon: 'shopping-bag' },
      { id: 'auto', name: 'Auto Repair', query: 'auto repair', icon: 'car' },
      { id: 'dentist', name: 'Dentists', query: 'dentist', icon: 'tooth' },
      { id: 'lawyer', name: 'Lawyers', query: 'lawyer attorney', icon: 'gavel' },
      { id: 'plumber', name: 'Plumbers', query: 'plumber', icon: 'wrench' },
      { id: 'electrician', name: 'Electricians', query: 'electrician', icon: 'bolt' },
      { id: 'pet', name: 'Pet Services', query: 'pet grooming veterinary', icon: 'paw' },
      { id: 'realestate', name: 'Real Estate', query: 'real estate agent', icon: 'home' },
      { id: 'bakery', name: 'Bakeries', query: 'bakery', icon: 'bread-slice' },
      { id: 'florist', name: 'Florists', query: 'florist', icon: 'flower' },
      { id: 'photography', name: 'Photography', query: 'photographer studio', icon: 'camera' },
      { id: 'tutoring', name: 'Tutoring', query: 'tutoring education', icon: 'graduation-cap' },
      { id: 'cleaning', name: 'Cleaning', query: 'cleaning service', icon: 'broom' },
      { id: 'construction', name: 'Construction', query: 'construction contractor', icon: 'hard-hat' },
      { id: 'hotel', name: 'Hotels', query: 'hotel lodging', icon: 'bed' },
      { id: 'event', name: 'Event Venues', query: 'event venue', icon: 'calendar' },
    ],
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  console.log('   Categories reference created.\n');

  // 5. Create sample notification templates
  console.log('5. Creating notification templates...');
  await db.collection(COLLECTIONS.settings).doc('notificationTemplates').set({
    welcome: {
      title: 'Welcome to SmartLead Tool',
      message: 'Start finding leads without websites in your area. Search now to discover potential clients.',
      type: 'system',
    },
    paymentSuccess: {
      title: 'Payment Successful',
      message: 'Your payment of {{amount}} has been processed. {{credits}} credits have been added to your account.',
      type: 'payment',
    },
    lowCredits: {
      title: 'Running Low on Credits',
      message: 'You have only {{credits}} credits remaining. Purchase more to continue finding leads.',
      type: 'alert',
    },
    newFeature: {
      title: 'New Feature Available',
      message: '{{feature}} is now available. Try it out today.',
      type: 'promo',
    },
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  console.log('   Notification templates created.\n');

  console.log('All collections and settings have been configured successfully.\n');
}

async function createIndexes() {
  console.log('Index Configuration (apply via Firebase Console or CLI):\n');
  
  const indexes = [
    {
      collection: 'leads',
      fields: ['userId', 'createdAt'],
      description: 'Query leads by user, ordered by creation date',
    },
    {
      collection: 'leads',
      fields: ['userId', 'status', 'createdAt'],
      description: 'Query leads by user and status, ordered by creation date',
    },
    {
      collection: 'leads',
      fields: ['userId', 'category', 'createdAt'],
      description: 'Query leads by user and category, ordered by creation date',
    },
    {
      collection: 'transactions',
      fields: ['userId', 'createdAt'],
      description: 'Query transactions by user, ordered by creation date',
    },
    {
      collection: 'transactions',
      fields: ['userId', 'status', 'createdAt'],
      description: 'Query transactions by user and status',
    },
    {
      collection: 'searches',
      fields: ['userId', 'createdAt'],
      description: 'Query search history by user, ordered by date',
    },
    {
      collection: 'notifications',
      fields: ['userId', 'read', 'createdAt'],
      description: 'Query notifications by user and read status',
    },
    {
      collection: 'analytics',
      fields: ['date'],
      description: 'Query analytics by date',
    },
  ];

  indexes.forEach((index, i) => {
    console.log(`${i + 1}. ${index.collection}`);
    console.log(`   Fields: ${index.fields.join(', ')}`);
    console.log(`   Purpose: ${index.description}\n`);
  });

  // Generate firestore.indexes.json content
  const indexConfig = {
    indexes: indexes.map(idx => ({
      collectionGroup: idx.collection,
      queryScope: 'COLLECTION',
      fields: idx.fields.map((field, i) => ({
        fieldPath: field,
        order: i === idx.fields.length - 1 ? 'DESCENDING' : 'ASCENDING',
      })),
    })),
    fieldOverrides: [],
  };

  console.log('\nfirestore.indexes.json content:');
  console.log(JSON.stringify(indexConfig, null, 2));
}

function generateSecurityRules(): string {
  return `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function hasCredits(required) {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.credits >= required;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isOwner(userId) && 
        !request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'status']);
      allow delete: if isAdmin();
      
      // User subcollections
      match /private/{document=**} {
        allow read, write: if isOwner(userId);
      }
    }
    
    // Leads collection
    match /leads/{leadId} {
      allow read: if isAuthenticated() && 
        (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if isAuthenticated() && 
        request.resource.data.userId == request.auth.uid;
      allow update: if isAuthenticated() && 
        resource.data.userId == request.auth.uid &&
        !request.resource.data.diff(resource.data).affectedKeys().hasAny(['userId', 'createdAt']);
      allow delete: if isAuthenticated() && 
        (resource.data.userId == request.auth.uid || isAdmin());
    }
    
    // Transactions collection
    match /transactions/{transactionId} {
      allow read: if isAuthenticated() && 
        (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if false; // Only server can create
      allow update: if false; // Only server can update
      allow delete: if false; // Never delete transactions
    }
    
    // Searches collection
    match /searches/{searchId} {
      allow read: if isAuthenticated() && 
        (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if isAuthenticated() && 
        request.resource.data.userId == request.auth.uid;
      allow update, delete: if false; // Search history is immutable
    }
    
    // Notifications collection
    match /notifications/{notificationId} {
      allow read: if isAuthenticated() && 
        resource.data.userId == request.auth.uid;
      allow create: if false; // Only server can create
      allow update: if isAuthenticated() && 
        resource.data.userId == request.auth.uid &&
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['read', 'readAt']);
      allow delete: if isAuthenticated() && 
        resource.data.userId == request.auth.uid;
    }
    
    // Settings collection (public read, admin write)
    match /settings/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Analytics collection (admin only)
    match /analytics/{document} {
      allow read: if isAdmin();
      allow write: if false; // Only server can write
    }
    
    // API Logs (admin only)
    match /apiLogs/{document} {
      allow read: if isAdmin();
      allow write: if false; // Only server can write
    }
    
    // Feedback collection
    match /feedback/{feedbackId} {
      allow read: if isAdmin();
      allow create: if isAuthenticated();
      allow update, delete: if false;
    }
    
    // Exports collection
    match /exports/{exportId} {
      allow read: if isAuthenticated() && 
        resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && 
        request.resource.data.userId == request.auth.uid;
      allow delete: if isAuthenticated() && 
        resource.data.userId == request.auth.uid;
    }
  }
}`;
}

async function main() {
  console.log('='.repeat(60));
  console.log('SmartLead Tool - Firebase Backend Setup');
  console.log('='.repeat(60) + '\n');

  try {
    // Setup collections
    await setupCollections();

    // Create indexes info
    await createIndexes();

    // Generate security rules
    console.log('\n' + '='.repeat(60));
    console.log('Firestore Security Rules');
    console.log('='.repeat(60) + '\n');
    console.log(generateSecurityRules());

    console.log('\n' + '='.repeat(60));
    console.log('Setup Complete');
    console.log('='.repeat(60));
    console.log('\nNext steps:');
    console.log('1. Copy the security rules above to Firebase Console > Firestore > Rules');
    console.log('2. Deploy indexes: firebase deploy --only firestore:indexes');
    console.log('3. Verify collections in Firebase Console');

  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

// Export for use as module
export { setupCollections, createIndexes, generateSecurityRules };

// Run if executed directly
if (require.main === module) {
  main().then(() => process.exit(0));
}
