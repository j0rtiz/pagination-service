module.exports = {
    clearMocks: true,
    collectCoverage: false,
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
        'src/container',
        'test/features'
    ],
    coverageProvider: 'babel',
    coverageReporters: ['json', 'text', 'lcov', 'clover'],
    globalSetup: './test/support/features/setup/jestInit.js',
    globalTeardown: '<rootDir>/test/support/features/setup/jestFinish.js',
    moduleDirectories: ['node_modules', 'src', '.', '<rootDir>'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    restoreMocks: true,
    rootDir: './',
    roots: ['<rootDir>/test/features'],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['node_modules']
};
