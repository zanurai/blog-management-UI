/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xsm: "500px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      fontSize: {
        h1: "2.1rem",
        h2: "2rem",
        h3: "1.5rem",
        h4: "1rem",
      },

      colors: {
        primary: "#3b82f6",
        secondary: "#2d3748",
        colorbuttom: "#2563EB",
        color: "#1D4ED8",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
