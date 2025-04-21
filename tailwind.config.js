/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vueform.config.ts", // or where `vueform.config.js` is located. Change `.js` to `.ts` if required.
    "./node_modules/@vueform/vueform/themes/tailwind/**/*.vue",
    "./node_modules/@vueform/vueform/themes/tailwind/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgba(var(--color-primary), 1)",
        "primary-100": "rgba(var(--color-primary), .1)",
        "primary-200": "rgba(var(--color-primary), .2)",
        "primary-300": "rgba(var(--color-primary), .5)",

        secondary: "rgba(var(--color-secondary), 1)",
        "secondary-100": "rgba(var(--color-secondary), .1)",
        "secondary-200": "rgba(var(--color-secondary), .2)",
        "secondary-300": "rgba(var(--color-secondary), .5)",

        "primary-fixed": "#165788",
        "secondary-fixed": "#00AEEF",

        terciary: "rgba(28,117,188, 1)",
        "terciary-100": "rgba(28,117,188, .1)",
        "terciary-200": "rgba(28,117,188, .2)",
        "terciary-300": "rgba(28,117,188, .5)",

        oscuro: "#403F41",
        "oscuro-300": "#67707A",
        "oscuro-200": "#838F9E",
        "oscuro-100": "#E8E9EC",

        error: "#C91038",
        "error-50": "#f7dbe1",

        success: "#23A739",
        "success-50": "#def2e1",

        //disabled es el oscuro-200
        "disable-100": "#c0c4ca",
      },
      fontSize: {
        "2.5xl": "22px",
      },
    },
    fontFamily: {
      calibri: ["Calibril", "sans"],
      mesmerize: ["Mesmerize", "sans-serif"],
    },
    boxShadow: {
      inset: "inset 2px 4px 4px 0 rgb(0 0 0 / 0.25)",
      "select-open": "inset 2px 2px 4px 0 rgb(0 0 0 / 0.25)",
    },
  },
  plugins: [],
};
