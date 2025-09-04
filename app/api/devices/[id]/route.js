import { NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/verifyToken';
import { admin } from '../../../lib/firebaseAdmin';

// Ensure this route runs on the Node.js runtime (required for firebase-admin)
export const runtime = 'nodejs';

/**
 * GET: Fetch a single device by ID (Restricted to auth users)
 */
export async function GET(req, { params }) {
  try {
    await verifyToken(req);

    const { id } = params;
    const db = admin.firestore();
    const docRef = await db.collection('devices').doc(id).get();
    if (!docRef.exists) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 });
    }

    return NextResponse.json(
      { id: docRef.id, ...docRef.data() },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

/**
 * PATCH: Update a device by ID (Restricted to auth users)
 */
export async function PATCH(req, { params }) {
  try {
    await verifyToken(req);

    const { id } = params;
    const body = await req.json();

    const db = admin.firestore();
    await db
      .collection('devices')
      .doc(id)
      .update({
        ...body,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

/**
 * DELETE: Remove a device by ID (Restricted to auth users)
 */
export async function DELETE(req, { params }) {
  try {
    await verifyToken(req);

    const { id } = params;
    const db = admin.firestore();
    await db.collection('devices').doc(id).delete();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
