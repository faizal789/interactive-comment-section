/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "moderate-blue-primary": "hsl(238, 40%, 52%)",
        "soft-red-primary": "hsl(358, 79%, 66%)",
        "light-grayish-blue-primary": "hsl(239, 57%, 85%)",
        "pale-red-primary": "hsl(357, 100%, 86%)",
        "dark-blue-neutral": "hsl(212, 24%, 26%)",
        "grayish-blue-neutral": "hsl(211, 10%, 45%)",
        "light-gray-neutral": "hsl(223, 19%, 93%)",
        "very-light-gray-neutral": "hsl(228, 33%, 97%)",
        White: "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        ["sans"]: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
