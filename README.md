# Library Management System

## Overview

This project is a Library Management System built with Node.js, Express, and Next.js. It provides functionalities for managing books, users, and administrative tasks in a library setting. The project is structured as a **Turborepo**, which allows for efficient management of multiple applications and shared packages.

## Turborepo Structure

This repository is organized as a Turborepo, which includes the following applications and shared packages:

### Applications

- **Admin**: A Next.js application for administrative tasks, allowing admins to manage users and books.
- **Client**: A Next.js application for end-users to interact with the library system, including searching for books and managing their accounts.
- **Server**: An Express.js backend that handles API requests, authentication, and database interactions.

### Shared Packages

- **@repo/shared**: Contains shared TypeScript types and schemas used across applications.
- **@repo/ui**: A shared React component library that provides reusable UI components for both the Admin and Client applications.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL (or your preferred database)

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/library-management-app.git
cd library-management-app
npm install
```

### Running the Project

To run the development server, use:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## File Structure

The file structure of the project is as follows:

```
library-management-app/
├── apps/
│   ├── admin/                # Admin application
│   ├── client/               # Client application
│   └── server/               # Server application
├── packages/
│   ├── shared/               # Shared types and schemas
│   └── ui/                   # Shared UI components
├── .gitignore
├── package.json
└── README.md
```

## Routes

### User Routes

- `GET /api/user` - Get user details
- `POST /api/user/create` - Create a new user
- `POST /api/user/login` - User login
- `POST /api/user/remove` - Delete a user
- `PUT /api/user/update` - Update user details
- `GET /api/user/verify` - Verify user

### Book Routes

- `GET /api/book` - Get all books
- `POST /api/book/create` - Create a new book
- `GET /api/book/latest` - Get the latest books
- `GET /api/book/:id` - Get a book by ID
- `PATCH /api/book/:id` - Update a book by ID
- `DELETE /api/book/:id` - Delete a book by ID

### Admin Routes

- `GET /api/admin/all-users` - Get all users
- `GET /api/admin/all-verified-users` - Get all verified users
- `DELETE /api/admin/remove-unverified-users` - Remove all unverified users
- `DELETE /api/admin/delete/:userId` - Delete a user by ID
- `POST /api/admin/add-user` - Add a new user

### Health Check

- `GET /health` - Check if the server is running

## Technologies Used

- Node.js
- Express
- Next.js
- TypeScript
- PostgreSQL
- Swagger for API documentation

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

