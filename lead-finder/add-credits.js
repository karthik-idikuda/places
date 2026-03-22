const admin = require('firebase-admin');

// Initialize Firebase Admin with project ID
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'gen-lang-client-0976545577'
  });
}

const db = admin.firestore();

async function listUsersAndAddCredits() {
  try {
    // Get all users
    const usersSnapshot = await db.collection('users').get();
    console.log('\n=== Users in database ===');
    
    let userToUpdate = null;
    usersSnapshot.forEach(doc => {
      const data = doc.data();
      console.log(`Email: ${data.email} | Credits: ${data.credits} | UID: ${doc.id}`);
      // Store the first user (or you can specify which one)
      if (!userToUpdate) {
        userToUpdate = { id: doc.id, data };
      }
    });

    if (userToUpdate) {
      console.log(`\n=== Adding 10 credits to ${userToUpdate.data.email} ===`);
      await db.collection('users').doc(userToUpdate.id).update({
        credits: admin.firestore.FieldValue.increment(10)
      });
      
      // Verify the update
      const updatedDoc = await db.collection('users').doc(userToUpdate.id).get();
      console.log(`✅ Credits updated! New balance: ${updatedDoc.data().credits}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

listUsersAndAddCredits();
