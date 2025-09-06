import { NextResponse } from 'next/server'

type ReqBody = {
  email?: string
  hp?: string
}

const simpleEmailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

// keep in memory for demo only; not exposed via GET to avoid leaking data
let inMemoryList: string[] = []

export async function POST(request: Request) {
  try {
    const body: ReqBody = await request.json();
    const email = (body.email || '').trim();
    const hp = (body.hp || '').trim();

    // honeypot—if filled, silently reject
    if (hp) return NextResponse.json({ message: 'OK' }, { status: 200 });

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }
    if (!simpleEmailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email.' }, { status: 400 });
    }

    // store in memory (demo only)
    if (!inMemoryList.includes(email)) inMemoryList.push(email);
    return NextResponse.json({ message: 'Subscription received.' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
  }
}
