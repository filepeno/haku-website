const { resolve } = require("path");

module.exports = {
  base: "./", //set base here or in the build command
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        sub1: resolve(__dirname, "subpages/search-page.html"),
        sub2: resolve(__dirname, "subpages/sign-up.html"),
      },
    },
  },
};
