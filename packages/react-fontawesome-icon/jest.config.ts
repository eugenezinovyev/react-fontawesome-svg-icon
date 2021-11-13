export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "json",
    "lcovonly",
    "@lcov-viewer/istanbul-report"
  ],
  testEnvironment: "jsdom",
  transform: {
      "^.+\\.tsx?$": "ts-jest"
  },
};
