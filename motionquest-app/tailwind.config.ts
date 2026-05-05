import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        warm: "#FFF8E7",
        surfaceCard: "#FFFFFF",
        textPrimary: "#10231F",
        textMuted: "#394B45",
        primaryAction: "#075E54",
        primaryHover: "#064C45",
        secondaryTarget: "#F6C85F",
        successTint: "#D8F3DC",
        successSolid: "#075E2B",
        warningTint: "#FFE8A3",
        errorSolid: "#8A1C1C",
        cameraScrim: "#071B17",
        overlaySkeleton: "#7CF7D4",
        overlayPoint: "#FFE66D",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        camera: "0 12px 32px rgba(7, 27, 23, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
