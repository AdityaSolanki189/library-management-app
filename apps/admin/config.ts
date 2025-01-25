export const apiUrl =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : process.env.BACKEND_URL;
