/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            spacing: {
                'SEARCHCARD': '37rem',
            }
        }
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: ["coffee"],
    }
}
