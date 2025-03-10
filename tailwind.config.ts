import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-blue": "#E6F4FF",
        "primary-blue": "#4AA4DE",
        "secondary-blue": "#63B4E8",
      },
    },
  },
  plugins: [],
};

export default config; 