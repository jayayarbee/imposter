import type { Config } from "tailwindcss";

// Design tokens live as CSS variables in app/globals.css (light + dark).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--bg)",
        surface: "var(--surface)",
        subtle: "var(--subtle)",
        line: "var(--border)",
        ink: "var(--fg)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-fg)",
        danger: "var(--danger)",
        ok: "var(--ok)",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      borderRadius: { lg: "0.625rem" },
    },
  },
  plugins: [],
};
export default config;
