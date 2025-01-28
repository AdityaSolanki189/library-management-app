import JWT from 'jsonwebtoken';
import { BackendError } from './errors';
import 'dotenv/config';

const JWT_CONFIG: JWT.SignOptions = {
    expiresIn: '7d',
};

export default function generateToken(
    userId: string,
    isAdmin: boolean,
): string {
    return JWT.sign({ userId, isAdmin }, process.env.JWT_SECRET!, JWT_CONFIG!);
}

export function verifyToken(token: string) {
    try {
        const data = JWT.verify(token, process.env.JWT_SECRET!);

        return data as { userId: string };
    } catch (err) {
        if (err instanceof JWT.TokenExpiredError) {
            throw new BackendError('UNAUTHORIZED', {
                message: 'Token expired',
            });
        }

        throw new BackendError('UNAUTHORIZED', {
            message: 'Invalid token',
        });
    }
}
