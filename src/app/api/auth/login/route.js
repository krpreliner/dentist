import { NextResponse } from 'next/server';
import { encrypt } from '../../../../lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const expectedUser = process.env.ADMIN_USERNAME;
    const expectedPass = process.env.ADMIN_PASSWORD;

    // Basic validation
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    // Check credentials against Env Vars
    if (username === expectedUser && password === expectedPass) {
      // Create session
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
      const session = await encrypt({ user: username, expires });

      // Save the session in a cookie
      const cookieStore = await cookies();
      cookieStore.set('session', session, { expires, httpOnly: true, secure: process.env.NODE_ENV === 'production' });

      return NextResponse.json({ success: true, message: 'Logged in successfully' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
