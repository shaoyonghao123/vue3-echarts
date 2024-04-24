/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // 从index,src中以vue,js,ts,jsx,tsx结尾的文件中去使用tailwindcss
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

