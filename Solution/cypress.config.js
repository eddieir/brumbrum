const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl is optional, you can set it if needed
    //baseUrl: 'https://www.autohero.com/it/',
    chromeWebSecurity: false, 
    // Ensure video recording is enabled
    video: true,
    
    // Optional settings
    videoCompression: 32, // value between 0 (no compression) and 51 (maximum compression)
    videosFolder: 'cypress/videos', // specify folder for videos
    

    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // auto open devtools
          launchOptions.args.push('--incognito')
          return launchOptions
        }
      })
    },

  },
})
