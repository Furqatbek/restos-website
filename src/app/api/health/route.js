export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { pruneIfDue } from '@/lib/retention';

// Liveness for the Docker healthcheck. It used to fetch /api/demos, which
// meant the healthcheck depended on the leads list being public.
export function GET() {
  try {
    db.prepare('SELECT 1').get();
    pruneIfDue();
    return NextResponse.json({ ok: true });
  } catch (_) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
