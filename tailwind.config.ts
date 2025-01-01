import type { Config } from "tailwindcss";
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      typography: {
      
        DEFAULT: {
          css: {
            color: '#9AA3A6',
            // Inline elements
            a: {
              color: 'rgb(20 184 166 / var(--tw-text-opacity, 1))',
              fontWeight: 700,
            },
            'a:hover': {
              color: 'rgb(20 184 166 / var(--tw-text-opacity, 0.7))',
              textDecorationColor: 'var(--tw-prose-underline-hover)',
            },    

          
          },
        },
      },
    },
  },  
  plugins: [typographyPlugin],
} satisfies Config
