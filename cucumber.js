module.exports = {
	default: {
		formatOptions: {
			snippetInterface: 'async-await',
			resultsDir: 'allure-results',
		},
		paths: ['src/tests/features/*.feature'],
		publishQuiet: true,
		dryRun: false,
		require: ['src/tests/steps/*.ts', 'src/support/*.ts'],
		requireModule: ['ts-node/register'],
		format: ['allure-cucumberjs/reporter', 'rerun:@rerun.txt'],
		// parallel: 2,
	},
	rerun: {
		formatOptions: {
			snippetInterface: 'async-await',
			resultsDir: 'allure-results',
		},
		publishQuiet: true,
		dryRun: false,
		require: ['src/test/steps/*.ts', 'src/test/utiles/*.ts'],
		requireModule: ['ts-node/register'],
		format: ['allure-cucumberjs/reporter', 'rerun:@rerun.txt'],
		// parallel: 2,
	},
};
