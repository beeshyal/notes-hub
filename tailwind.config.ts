import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#14213D",
          deep: "#0D1730",
          light: "#1E2E52"
        },
        parchment: {
          DEFAULT: "#F3ECD8",
          dim: "#E7DEC3"
        },
        stamp: {
          DEFAULT: "#A63A36",
          dark: "#7E2B28"
        },
        ok: "#3F7D58",
        slate: {
          DEFAULT: "#94A3B8"
        }
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
