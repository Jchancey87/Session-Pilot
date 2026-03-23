import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { id, ...rest } = data;

    const session = await prisma.session.upsert({
      where: { id: id || '' },
      update: rest,
      create: { id, ...rest },
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error('Failed to save session:', error);
    return NextResponse.json({ error: 'Failed to save session' }, { status: 500 });
  }
}
