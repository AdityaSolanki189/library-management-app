import consola from 'consola';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { mw as requestIp } from 'request-ip';
import routes from './routes/routes';
import './utils/env';
import { errorHandler } from './utils/errors';
import { logger } from './utils/logger';
import swaggerDocs from './utils/swagger';

const PORT = process.env.PORT!;

const app = express();

app.use(helmet());

app.use(express.json());
// cors middleware
const devOrigin = ['http://localhost:3001', 'http://localhost:3000'];
const allowedOrigins = devOrigin;
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    }),
);

app.use(requestIp());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        handler: (req, res) => {
            consola.warn(`DDoS Attempt from ${req.ip}`);
            res.status(429).json({
                error: 'Too many requests in a short time. Please try in a minute.',
            });
        },
    }),
);

app.use(logger);

app.get('/', (_req, res) => {
    res.json({
        message: 'Welcome to the API!',
    });
});

app.get('/health', (_req, res) => {
    res.json({
        message: 'Server is running',
        uptime: process.uptime(),
        timestamp: Date.now(),
    });
});

app.use('/api', routes);

app.use(errorHandler);

app.listen(PORT, () => {
    consola.info(`Server running at http://localhost:${PORT}`);
    // Swagger Docs
    swaggerDocs(app, +PORT!);
});
