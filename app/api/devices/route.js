import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/verifyToken'; // Adjust path as needed
import { admin } from '@/lib/firebaseAdmin'; // Adjust path as needed

const db = admin.firestore();

/**
 * GET: Fetch all devices (Restricted to auth users)
 */
export async function GET(req) {
  try {
    // Auth check
    await verifyToken(req);

    const snapshot = await db.collection('devices').get();
    const devices = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(devices, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

/**
 * POST: Create a new device (Restricted to auth users)
 */
export async function POST(req) {
  try {
    // Auth check
    await verifyToken(req);

    const body = await req.json();
    // Optionally add timestamps
    const newDeviceRef = db.collection('devices').doc();
    await newDeviceRef.set({
      ...body,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      { success: true, id: newDeviceRef.id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
