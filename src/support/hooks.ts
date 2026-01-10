import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import browserContextConfig from './webConfig';

BeforeAll(async function () {
  await browserContextConfig.launchBrowser();
});

Before(async function () {
  await browserContextConfig.createContextAndPage();
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await browserContextConfig.page.screenshot();
    await this.attach(screenshot, 'image/png');
  }
  await browserContextConfig.closeBrowserContext();
});

AfterAll(async function () {
  await browserContextConfig.closeBrowser();
});
