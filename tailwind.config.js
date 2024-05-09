/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        31: "2fr 1fr",
      },
      height: {
        v: "96.5vh",
        mh: "40vh",
      },
      width: {
        description: "99%",
        filter:'85%'
      },
      boxShadow: {
        card: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
      },
    },
  },
  plugins: [],
};
