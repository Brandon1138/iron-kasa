import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/verifyToken'; // Adjust path as needed
import { admin } from '@/lib/firebaseAdmin'; // Adjust path as needed

const db = admin.firestore();

/**
 * GET: Fetch a single device by ID (Restricted to auth users)
 */
export async function GET(req, { params }) {
  try {
    await verifyToken(req);

    const { id } = params;
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
    await db.collection('devices').doc(id).delete();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
