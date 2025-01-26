import { Express, Request, Response } from 'express';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import path from 'path';
import swaggerUI from 'swagger-ui-express'; // expose documentation in an interface
import { openApiSpec } from '../schema/openApiSpec';

// const options: swaggerJsdoc.Options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'GPS - Store API Docs',
//             version,
//             description: 'API developed with Node and Express',
//         },
//         components: {
//             securitySchemes: {
//                 bearerAuth: {
//                     type: 'http',
//                     scheme: 'bearer',
//                 },
//             },
//         },
//         security: [
//             {
//                 bearerAuth: [],
//             },
//         ],
//     },
//     apis: ['./src/routes/*.ts', './src/schema/*.ts'],
// };

// const swaggerSpecs = swaggerJsdoc(options);

// const openApiPath = path.join(__dirname, '../schema/openapispec.yaml');
// const openApiDocument = yaml.load(fs.readFileSync(openApiPath, 'utf8')) as swaggerUI.JsonObject;

function swaggerDocs(app: Express, port: number) {
    // Swagger page
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(openApiSpec));

    // Docs in JSON format
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(openApiSpec);
    });

    console.log(`Swagger Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
