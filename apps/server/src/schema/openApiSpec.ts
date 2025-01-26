import { OpenAPIV3 } from 'openapi-types';

export const openApiSpec: OpenAPIV3.Document = {
    openapi: '3.0.0',
    info: {
        title: 'Library Management System - API Docs',
        version: '1.0.0',
        description: 'API developed with Node and Express',
    },
    servers: [
        {
            url: 'http://localhost:4000',
            description: 'Development server',
        },
        {
            url: 'https://prod-server.com',
            description: 'Production server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                    },
                    name: {
                        type: 'string',
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                    },
                    password: {
                        type: 'string',
                        format: 'password',
                    },
                },
            },
        },
    },
    security: [{ bearerAuth: [] }],
    paths: {
        '/health': {
            get: {
                tags: ['System'],
                summary: 'Health check endpoint',
                description: 'Returns 200 OK if the service is running',
                responses: {
                    '200': {
                        description: 'Service is healthy',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: {
                                            type: 'string',
                                            example: 'OK',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/auth/register': {
            post: {
                tags: ['Authentication'],
                summary: 'Register a new user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string' },
                                    password: { type: 'string' },
                                    name: { type: 'string' },
                                },
                                required: ['email', 'password', 'name'],
                            },
                        },
                    },
                },
                responses: {
                    '201': { description: 'User registered successfully' },
                    '400': { description: 'Invalid input' },
                },
            },
        },
    },
};
