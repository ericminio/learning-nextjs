import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@domain/(.*)$": "<rootDir>/app/astroport/_domain/$1",
    "^@react/(.*)$": "<rootDir>/app/astroport/_react/$1",
    "^@server/(.*)$": "<rootDir>/app/astroport/_server/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(sql\\.js)/)",
  ],
};

export default createJestConfig(customJestConfig);
