// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayLightest: "#F3F4F6",
        grayLight: "#9CA3AF",
        grayBase: "#4B5563",
        grayDark: "#374151",
        grayDarkest: "#1F2937",
      },
    },
  },
  plugins: [],
};
