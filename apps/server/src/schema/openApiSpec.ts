import { OpenAPIV3 } from 'openapi-types';

export const openApiSpec: OpenAPIV3.Document = {
    openapi: '3.0.0',
    info: {
        title: 'Library Manager API',
        description: 'API developed with Node and Express',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:4000/',
            description: 'Development server',
        },
        {
            url: 'https://api.example.com/api/',
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
                    id: { type: 'string' },
                    email: { type: 'string' },
                    name: { type: 'string' },
                    role: {
                        type: 'string',
                        enum: ['user', 'admin'],
                    },
                    isVerified: { type: 'boolean' },
                    defaultShippingAddressId: {
                        type: 'integer',
                        nullable: true,
                    },
                    defaultBillingAddressId: {
                        type: 'integer',
                        nullable: true,
                    },
                },
            },
            Address: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    lineOne: { type: 'string' },
                    lineTwo: { type: 'string', nullable: true },
                    city: { type: 'string' },
                    pincode: { type: 'string' },
                    state: { type: 'string' },
                    country: { type: 'string' },
                    label: { type: 'string', nullable: true },
                    userId: { type: 'integer' },
                },
                required: ['lineOne', 'city', 'pincode', 'state', 'country'],
            },
            Product: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' },
                    stock: { type: 'integer' },
                    tags: { type: 'string' },
                },
                required: ['name', 'description', 'price', 'tags'],
            },
            Order: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    userId: { type: 'string' },
                    status: {
                        type: 'string',
                        enum: [
                            'pending',
                            'processing',
                            'shipped',
                            'delivered',
                            'cancelled',
                        ],
                    },
                    items: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                productId: { type: 'string' },
                                quantity: { type: 'integer' },
                                price: { type: 'number' },
                            },
                        },
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
        '/auth/login': {
            post: {
                tags: ['Authentication'],
                summary: 'Login user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string' },
                                    password: { type: 'string' },
                                },
                                required: ['email', 'password'],
                            },
                        },
                    },
                },
                responses: {
                    '200': { description: 'Login successful' },
                    '401': { description: 'Invalid credentials' },
                },
            },
        },
        '/auth/verification': {
            post: {
                tags: ['Authentication'],
                summary: 'Verify email address',
                responses: {
                    '200': { description: 'Email verified successfully' },
                    '400': { description: 'Invalid verification token' },
                },
            },
        },
        '/auth/me': {
            get: {
                tags: ['Authentication'],
                summary: 'Get current user settings',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'User settings retrieved successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    '401': { description: 'Unauthorized' },
                },
            },
        },
        '/product': {
            get: {
                tags: ['Products'],
                summary: 'Get all products',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'List of products',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Product',
                                    },
                                },
                            },
                        },
                    },
                    '401': { description: 'Unauthorized' },
                },
            },
            post: {
                tags: ['Products'],
                summary: 'Create a new product',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Product',
                            },
                        },
                    },
                },
                responses: {
                    '201': { description: 'Product created successfully' },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Admin access required' },
                },
            },
        },
        '/product/search': {
            get: {
                tags: ['Products'],
                summary: 'Search products',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'q',
                        in: 'query',
                        description: 'Search query',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Search results',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Product',
                                    },
                                },
                            },
                        },
                    },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Admin access required' },
                },
            },
        },
        '/product/{id}': {
            get: {
                tags: ['Products'],
                summary: 'Get product by ID',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Product details',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Product',
                                },
                            },
                        },
                    },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Product not found' },
                },
            },
            put: {
                tags: ['Products'],
                summary: 'Update product',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Product',
                            },
                        },
                    },
                },
                responses: {
                    '200': { description: 'Product updated successfully' },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Admin access required' },
                    '404': { description: 'Product not found' },
                },
            },
            delete: {
                tags: ['Products'],
                summary: 'Delete product',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    '200': { description: 'Product deleted successfully' },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Admin access required' },
                    '404': { description: 'Product not found' },
                },
            },
        },
        '/user/address': {
            post: {
                tags: ['Users'],
                summary: 'Add new address',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Address',
                            },
                        },
                    },
                },
                responses: {
                    '200': { description: 'Address added successfully' },
                    '401': { description: 'Unauthorized' },
                },
            },
            get: {
                tags: ['Users'],
                summary: 'Get user addresses',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'List of addresses',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Address',
                                    },
                                },
                            },
                        },
                    },
                    '401': { description: 'Unauthorized' },
                },
            },
        },
        '/user/address/{id}': {
            put: {
                tags: ['Users'],
                summary: 'Update address',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Address',
                            },
                        },
                    },
                },
                responses: {
                    '200': { description: 'Address updated successfully' },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Address not found' },
                },
            },
            delete: {
                tags: ['Users'],
                summary: 'Delete address',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '200': { description: 'Address deleted successfully' },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Address not found' },
                },
            },
        },
        '/user': {
            put: {
                tags: ['Users'],
                summary: 'Update user profile',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    defaultShippingAddressId: {
                                        type: 'integer',
                                    },
                                    defaultBillingAddressId: {
                                        type: 'integer',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': { description: 'User updated successfully' },
                    '401': { description: 'Unauthorized' },
                },
            },
        },
        '/user/{id}/role': {
            put: {
                tags: ['Users'],
                summary: 'Change user role',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    role: {
                                        type: 'string',
                                        enum: ['user', 'admin'],
                                    },
                                },
                                required: ['role'],
                            },
                        },
                    },
                },
                responses: {
                    '200': { description: 'User role updated successfully' },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Admin access required' },
                    '404': { description: 'User not found' },
                },
            },
        },
        '/user/all': {
            get: {
                tags: ['Users'],
                summary: 'Get all users',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'skip',
                        in: 'query',
                        schema: {
                            type: 'integer',
                            default: 0,
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'List of users',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                    },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Admin access required' },
                },
            },
        },
        '/user/{id}': {
            get: {
                tags: ['Users'],
                summary: 'Get user by ID',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'User details',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Admin access required' },
                    '404': { description: 'User not found' },
                },
            },
            delete: {
                tags: ['Users'],
                summary: 'Delete user',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '200': { description: 'User deleted successfully' },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Admin access required' },
                    '404': { description: 'User not found' },
                },
            },
        },
        '/cart': {
            post: {
                tags: ['Cart'],
                summary: 'Add item to cart',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    productId: { type: 'integer' },
                                    quantity: { type: 'integer' },
                                },
                                required: ['productId', 'quantity'],
                            },
                        },
                    },
                },
                responses: {
                    '200': { description: 'Item added to cart successfully' },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Product not found' },
                },
            },
            get: {
                tags: ['Cart'],
                summary: 'Get cart items',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'List of cart items',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            productId: { type: 'integer' },
                                            quantity: { type: 'integer' },
                                            product: {
                                                $ref: '#/components/schemas/Product',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '401': { description: 'Unauthorized' },
                },
            },
        },
        '/cart/{id}': {
            delete: {
                tags: ['Cart'],
                summary: 'Remove item from cart',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Item removed from cart successfully',
                    },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Cart item not found' },
                },
            },
            put: {
                tags: ['Cart'],
                summary: 'Change item quantity',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    quantity: { type: 'integer' },
                                },
                                required: ['quantity'],
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Item quantity updated successfully',
                    },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Cart item not found' },
                },
            },
        },
        '/order': {
            post: {
                tags: ['Orders'],
                summary: 'Create new order',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': { description: 'Order created successfully' },
                    '401': { description: 'Unauthorized' },
                },
            },
            get: {
                tags: ['Orders'],
                summary: 'List all orders for current user',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'List of orders',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Order',
                                    },
                                },
                            },
                        },
                    },
                    '401': { description: 'Unauthorized' },
                },
            },
        },
        '/order/index': {
            get: {
                tags: ['Orders'],
                summary: 'Get all orders (admin only)',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'List of all orders',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Order',
                                    },
                                },
                            },
                        },
                    },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Admin access required' },
                },
            },
        },
        '/order/{id}': {
            get: {
                tags: ['Orders'],
                summary: 'Get order by ID',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Order details',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order',
                                },
                            },
                        },
                    },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Order not found' },
                },
            },
        },
        '/order/{id}/status': {
            put: {
                tags: ['Orders'],
                summary: 'Change order status (admin only)',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        enum: [
                                            'pending',
                                            'processing',
                                            'shipped',
                                            'delivered',
                                            'cancelled',
                                        ],
                                    },
                                },
                                required: ['status'],
                            },
                        },
                    },
                },
                responses: {
                    '200': { description: 'Order status updated successfully' },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Admin access required' },
                    '404': { description: 'Order not found' },
                },
            },
        },
        '/order/{id}/cancel': {
            put: {
                tags: ['Orders'],
                summary: 'Cancel order',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' },
                    },
                ],
                responses: {
                    '200': { description: 'Order cancelled successfully' },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Order not found' },
                },
            },
        },
    },
};
