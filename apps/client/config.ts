export const apiUrl =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : 'http://library-manager-server:4000';
