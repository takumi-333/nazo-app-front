import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",

  theme: {
    // ─────────────────────────────────────────
    // SCREENS  ―  Notion-aligned breakpoints
    // ─────────────────────────────────────────
    screens: {
      xs: "400px", // Mobile
      sm: "600px", // Tablet Small
      md: "768px", // Tablet
      lg: "1080px", // Desktop Small
      xl: "1200px", // Desktop
      "2xl": "1440px", // Large Desktop
    },

    extend: {
      // ─────────────────────────────────────────
      // COLORS
      // ─────────────────────────────────────────
      colors: {
        // ── Core canvas ──────────────────────
        canvas: {
          DEFAULT: "#ffffff",
          warm: "#f6f5f4",
          dark: "#31302e",
        },

        // ── Brand primaries ──────────────────
        notion: {
          black: "rgba(0,0,0,0.95)", // near-black text
          blue: "#0075de", // primary CTA / links
          "blue-active": "#005bab", // pressed state
          navy: "#213183", // deep secondary brand
        },

        // ── Warm neutral scale ────────────────
        warm: {
          50: "#faf9f8",
          100: "#f6f5f4", // Warm White  — section bg
          200: "#eae8e5",
          300: "#d4d0cb",
          400: "#b8b2ab",
          500: "#a39e98", // Warm Gray 300 — placeholder / disabled
          600: "#7d7872",
          700: "#615d59", // Warm Gray 500 — secondary text
          800: "#3e3b37",
          900: "#31302e", // Warm Dark — dark surface
          950: "#1c1a18",
        },

        // ── Interactive ───────────────────────
        link: {
          DEFAULT: "#0075de",
          light: "#62aef0", // on dark backgrounds
          focus: "#097fe8",
        },
        badge: {
          bg: "#f2f9ff",
          text: "#097fe8",
        },
        focus: "#097fe8",

        // ── Semantic accents ──────────────────
        teal: "#2a9d99",
        green: "#1aae39",
        orange: "#dd5b00",
        pink: "#ff64c8",
        purple: "#391c57",
        brown: "#523410",

        // ── Riddle-specific accents ───────────
        // (warm amber for hints / mystery atmosphere)
        riddle: {
          gold: "#c9861a", // hint glow / star rating
          "gold-bg": "#fff8ed",
          mystery: "#4a3728", // deep warm brown for mystery tone
          correct: "#1aae39", // correct answer glow
          wrong: "#dd5b00", // incorrect answer flash
          timer: "#e05353", // time pressure color
        },
      },

      // ─────────────────────────────────────────
      // FONT FAMILY
      // ─────────────────────────────────────────
      fontFamily: {
        // NotionInter is loaded via @font-face in globals.css
        // Fallback chain mirrors Notion's exactly
        sans: [
          "NotionInter",
          "Inter",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Helvetica",
          "Apple Color Emoji",
          "Arial",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "sans-serif",
        ],
        // Mono — for answer input / code display
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },

      // ─────────────────────────────────────────
      // FONT SIZE  ―  Notion typography scale
      // Each entry: [fontSize, { lineHeight, letterSpacing, fontWeight? }]
      // ─────────────────────────────────────────
      fontSize: {
        // Display
        "display-hero": ["4rem", { lineHeight: "1.00", letterSpacing: "-2.125px" }],
        "display-2": ["3.375rem", { lineHeight: "1.04", letterSpacing: "-1.875px" }],
        section: ["3rem", { lineHeight: "1.00", letterSpacing: "-1.5px" }],
        "subhead-xl": ["2.5rem", { lineHeight: "1.50", letterSpacing: "normal" }],
        subhead: ["1.625rem", { lineHeight: "1.23", letterSpacing: "-0.625px" }],
        "card-title": ["1.375rem", { lineHeight: "1.27", letterSpacing: "-0.25px" }],
        // Body
        "body-lg": ["1.25rem", { lineHeight: "1.40", letterSpacing: "-0.125px" }],
        body: ["1rem", { lineHeight: "1.50", letterSpacing: "normal" }],
        // UI
        nav: ["0.9375rem", { lineHeight: "1.33", letterSpacing: "normal" }],
        caption: ["0.875rem", { lineHeight: "1.43", letterSpacing: "normal" }],
        badge: ["0.75rem", { lineHeight: "1.33", letterSpacing: "0.125px" }],
        micro: ["0.75rem", { lineHeight: "1.33", letterSpacing: "0.125px" }],
      },

      // ─────────────────────────────────────────
      // FONT WEIGHT
      // ─────────────────────────────────────────
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      // ─────────────────────────────────────────
      // SPACING  ―  8px base, organic scale
      // ─────────────────────────────────────────
      spacing: {
        px: "1px",
        0.5: "2px",
        0.75: "3px",
        1: "4px",
        1.25: "5px",
        1.5: "6px",
        1.75: "7px",
        2: "8px",
        2.75: "11px",
        3: "12px",
        3.5: "14px",
        4: "16px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
        30: "120px",
      },

      // ─────────────────────────────────────────
      // BORDER RADIUS  ―  Notion radius scale
      // ─────────────────────────────────────────
      borderRadius: {
        none: "0px",
        micro: "4px", // buttons, inputs
        subtle: "5px", // links, list items
        sm: "8px", // small cards, inline
        DEFAULT: "12px", // standard cards
        lg: "16px", // hero cards, featured
        full: "9999px", // pill badges, avatars
      },

      // ─────────────────────────────────────────
      // BOX SHADOW  ―  Notion's multi-layer system
      // ─────────────────────────────────────────
      boxShadow: {
        // Whisper — just a border, no shadow
        whisper: "inset 0 0 0 1px rgba(0,0,0,0.1)",

        // Card — 4-layer soft elevation
        card: [
          "rgba(0,0,0,0.04) 0px 4px 18px",
          "rgba(0,0,0,0.027) 0px 2.025px 7.84688px",
          "rgba(0,0,0,0.02) 0px 0.8px 2.925px",
          "rgba(0,0,0,0.01) 0px 0.175px 1.04062px",
        ].join(", "),

        // Card hover — slightly intensified
        "card-hover": [
          "rgba(0,0,0,0.07) 0px 6px 24px",
          "rgba(0,0,0,0.045) 0px 3px 10px",
          "rgba(0,0,0,0.03) 0px 1px 4px",
          "rgba(0,0,0,0.015) 0px 0.25px 1.5px",
        ].join(", "),

        // Deep — 5-layer modal/featured elevation
        deep: [
          "rgba(0,0,0,0.01) 0px 1px 3px",
          "rgba(0,0,0,0.02) 0px 3px 7px",
          "rgba(0,0,0,0.02) 0px 7px 15px",
          "rgba(0,0,0,0.04) 0px 14px 28px",
          "rgba(0,0,0,0.05) 0px 23px 52px",
        ].join(", "),

        // Riddle special — warm golden glow for correct answer
        "correct-glow": [
          "rgba(26,174,57,0.12) 0px 0px 0px 3px",
          "rgba(26,174,57,0.06) 0px 4px 16px",
        ].join(", "),

        // Riddle special — amber glow for hint reveal
        "hint-glow": [
          "rgba(201,134,26,0.10) 0px 0px 0px 2px",
          "rgba(201,134,26,0.05) 0px 4px 12px",
        ].join(", "),

        // Focus ring
        focus: "0 0 0 2px #097fe8",

        none: "none",
      },

      // ─────────────────────────────────────────
      // MAX WIDTH
      // ─────────────────────────────────────────
      maxWidth: {
        content: "1200px",
        prose: "720px",
        card: "480px",
        play: "560px", // P-02 出題画面の最大幅
      },

      // ─────────────────────────────────────────
      // TRANSITION / ANIMATION
      // ─────────────────────────────────────────
      transitionDuration: {
        fast: "100ms",
        DEFAULT: "160ms",
        slow: "240ms",
        reveal: "320ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
      },

      keyframes: {
        // ── Page / reveal ──
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },

        // ── Answer feedback ──
        "correct-pop": {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.06)" },
          "70%": { transform: "scale(0.98)" },
          "100%": { transform: "scale(1)" },
        },
        "wrong-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(5px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(3px)" },
        },

        // ── Hint reveal ──
        "hint-reveal": {
          from: {
            opacity: "0",
            transform: "translateY(-4px)",
            maxHeight: "0px",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
            maxHeight: "200px",
          },
        },

        // ── Timer pulse (last 10 sec) ──
        "timer-pulse": {
          "0%, 100%": { color: "var(--color-riddle-timer)", transform: "scale(1)" },
          "50%": { color: "#ff3333", transform: "scale(1.1)" },
        },

        // ── Star rating fill ──
        "star-fill": {
          from: { transform: "scale(0.7) rotate(-10deg)", opacity: "0" },
          to: { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },

        // ── Splash / loading ──
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },

        // ── Slide-in for toast / modal ──
        "slide-up": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          from: { transform: "translateY(-100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },

      animation: {
        "fade-in": "fade-in 160ms ease-out both",
        "fade-up": "fade-up 240ms cubic-bezier(0,0,0.2,1) both",
        "fade-down": "fade-down 200ms cubic-bezier(0,0,0.2,1) both",
        "scale-in": "scale-in 200ms cubic-bezier(0.34,1.56,0.64,1) both",
        "correct-pop": "correct-pop 400ms cubic-bezier(0.34,1.56,0.64,1)",
        "wrong-shake": "wrong-shake 320ms ease-in-out",
        "hint-reveal": "hint-reveal 240ms ease-out both",
        "timer-pulse": "timer-pulse 800ms ease-in-out infinite",
        "star-fill": "star-fill 200ms cubic-bezier(0.34,1.56,0.64,1) both",
        "spin-slow": "spin-slow 1.4s linear infinite",
        "bounce-gentle": "bounce-gentle 1.8s ease-in-out infinite",
        "slide-up": "slide-up 280ms cubic-bezier(0,0,0.2,1) both",
        "slide-down": "slide-down 200ms cubic-bezier(0,0,0.2,1) both",
      },
    },
  },

  plugins: [],
};

export default config;
