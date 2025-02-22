import 'server-only';

export async function verifyToken(req) {
  // Typically the token is passed in Authorization header: "Bearer <id-token>"
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    throw new Error('No token provided');
  }

  // Lazy import to avoid overhead if no calls are made
  const { admin } = await import('./firebaseAdmin');

  // Verify the ID token
  return admin.auth().verifyIdToken(token);
}
