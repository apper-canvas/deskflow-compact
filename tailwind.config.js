/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        accent: "#3b82f6",
        surface: "#ffffff",
        background: "#f8fafc",
        success: "#22c55e",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#06b6d4"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      animation: {
        checkmark: "checkmark 0.2s ease-out forwards",
        fadeOut: "fadeOut 0.3s ease-out forwards"
      },
      keyframes: {
        checkmark: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(100%)" }
        }
      }
    },
  },
  plugins: [],
}