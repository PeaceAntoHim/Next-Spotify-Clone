import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    // Token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;
    // Allow the request if the following is true...
    // 1) Its a request for next-auth session & provider fetching
    // 2) The token exist
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // Redirect them to login they dont have and are requesting a protected route
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login');
    }
}