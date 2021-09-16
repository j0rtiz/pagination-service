module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        'coverage',
        'json-server-mock',
        'logs',
        'node_modules',
        'src/app/application',
        'src/infra/error',
        'src/infra/logging',
        'src/interfaces',
        'src/container'
    ],
    coverageProvider: 'babel',
    coverageReporters: ['json', 'text', 'lcov', 'clover'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    moduleDirectories: ['node_modules', 'src', '.'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    rootDir: './',
    roots: ['<rootDir>/src', '<rootDir>/test/unit/src'],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['node_modules']
};
