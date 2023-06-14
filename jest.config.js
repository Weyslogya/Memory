module.exports = {
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],

  testPathIgnorePatterns: ["/node_modules/"],

  transform: {
    "^.+\\.js$": "babel-jest",
  },

  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
};
