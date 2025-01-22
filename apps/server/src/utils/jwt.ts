import JWT from 'jsonwebtoken';
import process from 'node:process';
import { BackendError } from './errors';

const JWT_CONFIG: JWT.SignOptions = {
    expiresIn: '7d',
};

const { JWT_SECRET } = process.env;

export default function generateToken(userId: string, isAdmin: boolean): string {
    return JWT.sign({ userId, isAdmin }, JWT_SECRET!, JWT_CONFIG!);
}

export function verifyToken(token: string) {
    try {
        const data = JWT.verify(token, JWT_SECRET!);

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
