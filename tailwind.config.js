/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    fontFamily: {
      sans: ["Calibri", "inter", "sans-serif"],
    },
    extend: {
      fontFamily: {
        mermerize: ["mesmerize", "sans-serif"],
      },
      colors: {
        primary: "#165788",
        "primary-300": "#8babc3",
        "primary-200": "#d0dde7",
        "primary-100": "#e8eef3",

        secondary: "#1C75BC",
        "secondary-300": "#8dbadd",
        "secondary-200": "#d2e3f2",
        "secondary-100": "#e8f1f8",

        terciary: "#00AEEF",
        "terciary-300": "#80d7f7",
        "terciary-200": "#cceffc",
        "terciary-100": "#e5f7fd",

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
    },
  },
  plugins: [],
};
