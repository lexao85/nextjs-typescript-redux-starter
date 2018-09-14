const TEST_REGEX = "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$"

module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testRegex: TEST_REGEX,
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testPathIgnorePatterns: [
    "<rootDir>/.next/", "<rootDir>/node_modules/"
  ],
  moduleFileExtensions: [
    "ts", "tsx", "js", "jsx"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  collectCoverage: true
}