module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**', '!src/database/**', '!src/tests/**'],
	coverageDirectory: 'src/tests/coverage',
	testEnvironment: 'node',
	testMatch: ['**/**/tests/**/*.test.js?(x)'],
}
