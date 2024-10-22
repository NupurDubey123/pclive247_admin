const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://qa-admin.pclive247.com",
    specPattern: "cypress/e2e/**/*.{js, jsx, ts, tsx}"
  },
});
