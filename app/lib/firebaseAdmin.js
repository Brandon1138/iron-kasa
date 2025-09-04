import 'server-only';
import admin from 'firebase-admin';

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const rawPrivateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

// Only initialize when all required env vars are provided
if (!admin.apps.length && projectId && clientEmail && rawPrivateKey) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey: rawPrivateKey.replace(/\\n/g, '\n'),
    }),
  });
}

export { admin };

