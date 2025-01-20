import { SessionPayload } from '@repo/shared/schema';
import { decodeJwt, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import 'server-only';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function decryptSession(cookieName: string) {
    const cookieStore = await cookies();
    const session = cookieStore.get(cookieName)?.value;

    if (!session) return null;
    return {
        accessToken: session,
    };
}

export async function createSession(sessionPayload: SessionPayload) {
    const expiresAt = new Date();
    expiresAt.setUTCDate(expiresAt.getUTCDate() + 7); // Set expiration date to 7 days from now

    const isProduction = process.env.NODE_ENV === 'production';
    const cookieDomain = isProduction
        ? 'library-manager.onrender.com'
        : 'localhost';

    try {
        (await cookies()).set('accessToken', sessionPayload.accessToken, {
            httpOnly: true,
            secure: isProduction,
            expires: expiresAt,
            sameSite: isProduction ? 'none' : 'lax',
            path: '/',
            domain: cookieDomain,
        });
    } catch (error) {
        console.error('Failed to set cookie:', error);
    }
}

export async function getSession() {
    return decryptSession('accessToken');
}

export async function deleteSession() {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieDomain = isProduction
        ? 'library-manager.onrender.com'
        : 'localhost';

    const cookieStore = await cookies();
    return cookieStore.set('accessToken', '', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',
        domain: cookieDomain,
        expires: new Date(0),
    });
}

export async function isValidToken(token: string): Promise<boolean> {
    try {
        // Decode the JWT without verification to access the payload
        const decoded = decodeJwt(token);

        if (!decoded || typeof decoded.exp !== 'number') {
            console.error('Invalid token payload or missing expiration.');
            return false;
        }

        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp < currentTime) {
            console.error('Token has expired.');
            await deleteSession();
            return false;
        }

        // Verify the token's signature
        await jwtVerify(token, JWT_SECRET);

        return true; // Token is valid
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
}
