module.exports = {
    content: [
        './index.html',
        './src/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}'
    ],
    theme: {
        extend: {}
    },
    plugins: [require('tailwindcss-animate')]
};
