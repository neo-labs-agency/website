export const theme = {
  colors: {
    background: "#0A0A0F",
    foreground: "#E4E4E7",
    accent: "#7B3FE4",
    accentLight: "#9D6BF7",
    accentGlow: "rgba(123, 63, 228, 0.4)",
    muted: "#71717A",
    border: "rgba(255, 255, 255, 0.08)",
    glass: "rgba(255, 255, 255, 0.05)",
    glassBorder: "rgba(255, 255, 255, 0.1)",
  },
  gradients: {
    purpleGlow:
      "linear-gradient(135deg, #7B3FE4 0%, #5B21B6 50%, #3B0F7A 100%)",
    accent: "linear-gradient(135deg, #9D6BF7 0%, #7B3FE4 100%)",
    mesh: "radial-gradient(at 40% 20%, rgba(123, 63, 228, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(93, 33, 182, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(123, 63, 228, 0.08) 0px, transparent 50%)",
  },
} as const;
