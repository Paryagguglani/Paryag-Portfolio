import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 40px -12px rgba(56, 189, 248, 0.55)",
      },
      colors: {
        surface: "rgba(15, 23, 42, 0.85)",
      },
      backgroundImage: {
        halo: "radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 28%)",
      },
    },
  },
};

export default config;
