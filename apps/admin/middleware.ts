import { NextRequest, NextResponse } from 'next/server';
import { decryptSession, isValidToken } from './lib/sessions';

const PROTECTED_ROUTES = [
    '/admin',
    '/admin/books',
    '/admin/books/new',
];

const PUBLIC_ROUTES = ['/sign-in', '/sign-up', '/'];

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const isProtectedRoute = isRouteProtected(pathname);
    const isPublicRoute = isRoutePublic(pathname);

    try {
        const isTokenValid = await isTokenValidForRequest();

        // Redirect to login if accessing protected route without valid token
        if (shouldRedirectToLogin(isProtectedRoute, isTokenValid)) {
            return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
        }

        // Only redirect to dashboard from public routes when authenticated
        if (shouldRedirectToDashboard(isPublicRoute, isTokenValid)) {
            return NextResponse.redirect(new URL('/admin', req.nextUrl));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        if (isProtectedRoute) {
            return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
        }
    }

    return NextResponse.next();
}

function shouldRedirectToLogin(
    isProtectedRoute: boolean,
    isTokenValid: boolean,
) {
    return isProtectedRoute && !isTokenValid;
}

// Removed pathname parameter as it's not needed
function shouldRedirectToDashboard(
    isPublicRoute: boolean,
    isTokenValid: boolean,
) {
    return isPublicRoute && isTokenValid;
}

function isRouteProtected(pathname: string): boolean {
    return PROTECTED_ROUTES.some((route) => {
        // Use exact match for dashboard, startsWith for nested routes
        if (route === '/admin') {
            return pathname === '/admin';
        }
        return pathname.startsWith(route);
    });
}

function isRoutePublic(pathname: string): boolean {
    return PUBLIC_ROUTES.includes(pathname); // Changed to exact match
}

async function isTokenValidForRequest(): Promise<boolean> {
    const jwtToken = await decryptSession('accessToken');
    return jwtToken ? await isValidToken(jwtToken.accessToken) : false;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|ico|css|js|svg|woff|woff2|ttf|eot)).*)',
    ],
};
