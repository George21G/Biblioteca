export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/resources/js/tests/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/resources/js/$1',
    '^@/components/(.*)$': '<rootDir>/resources/js/components/$1',
    '^@/pages/(.*)$': '<rootDir>/resources/js/pages/$1',
    '^@/services/(.*)$': '<rootDir>/resources/js/services/$1',
    '^@/hooks/(.*)$': '<rootDir>/resources/js/hooks/$1',
    '^@/lib/(.*)$': '<rootDir>/resources/js/lib/$1',
    '^@/types/(.*)$': '<rootDir>/resources/js/types/$1',
  },
  testMatch: [
    '<rootDir>/resources/js/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/resources/js/**/*.{test,spec}.{ts,tsx}',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: [
    'resources/js/**/*.{ts,tsx}',
    '!resources/js/**/*.d.ts',
    '!resources/js/tests/**',
    '!resources/js/**/*.stories.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
}; 