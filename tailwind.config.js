/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./pages/**/*.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0e7e45',      // Primary Green
                secondary: '#8BC462',    // Light Green
                tertiary: '#732C02',     // Dark Brown
                fourth: '#8b4513',       // Primary Brown
                fifth: '#f5f5dc',        // Beige
                'light-brown': '#F3E5DC', // Light Brown for backgrounds
                'light-yellow': '#FFFBE6', // Light Yellow for backgrounds
                'dark-brown': '#2D1B0E',   // Very Dark Brown for text/hover
            },
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
