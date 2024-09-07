import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "35mm-homepage-gradient":
          "linear-gradient(to top, rgba(16, 16, 16, 1) 140dvh, rgba(16, 16, 16, 0))",
        "35mm-backdrop-gradient":
          "linear-gradient(to top, rgba(16, 16, 16, 1) 0%, rgba(16, 16, 16, 0.8) 25%, rgba(16, 16, 16, 0.4) 50%, rgba(16, 16, 16, 0.2) 75%, rgba(16, 16, 16, 0) 100%)",
      },
      backgroundColor: {
        "35mm-black-dark-opal": "rgba(16, 16, 16, 0.8)",
        "35mm-black-md": "rgba(24, 24, 24, 0.8)",
        "35mm-black-dark": "rgb(16, 16, 16)",
        "35mm-black-header": "rgb(27, 27, 27)"
      },
      colors: {
        "35mm-green-bright": "#08e8a1",
        "35mm-off-white": "rgb(237, 237, 237)",
      },
      boxShadow: {
        "35mm-green-glow": "rgba(8, 232, 161, 0.3) 0px 0px calc(0.9375rem)",
      },
    },
  },
  plugins: [],
};
export default config;
