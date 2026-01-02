import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import browserContextConfig from './webConfig';

BeforeAll(async function () {
	await browserContextConfig.launchBrowser();
});

Before(async function () {
	await browserContextConfig.createContextAndPage();
});

After(async function () {
	await browserContextConfig.closeBrowserContext();
});

AfterAll(async function () {
	await browserContextConfig.closeBrowser();
});
