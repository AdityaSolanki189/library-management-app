/** @type {import('tailwindcss').Config} */
import config from '../tailwind-config/tailwind.config.cjs';

module.exports = {
    ...config,
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ]
}