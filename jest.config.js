// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: [
    '<rootDir>/.test-setup.js'
  ]
}
