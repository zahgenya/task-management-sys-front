export default {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.test\\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
}