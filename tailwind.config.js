/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Enable dark mode with class strategy
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#4facfe',
                    secondary: '#00f2fe',
                    vibrant: '#6366f1',
                },
                architect: {
                    dark: '#0b0e11',
                    card: '#161920',
                    border: '#2a2e3a',
                    muted: '#94a3b8',
                },
                // Light mode semantic colors
                light: {
                    bg: '#f8fafc',
                    card: '#ffffff',
                    border: '#e2e8f0',
                    muted: '#64748b',
                    text: '#0f172a',
                },
                primary: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                    950: '#1e1b4b',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'text': 'shimmer 3s ease-in-out infinite',
                'blob': 'blob 7s infinite',
            },
            keyframes: {
                shimmer: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                blob: {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                }
            }
        },
    },
    plugins: [],
}
