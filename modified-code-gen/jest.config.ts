
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['*.{js,jsx,ts,tsx}'],
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx|js)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};