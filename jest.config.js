module.exports = {
  testMatch: ['**/static/js/**/*.test.js'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json'],
  collectCoverageFrom: ['static/js/**/*.js', '!static/js/**/*.test.js']
};
