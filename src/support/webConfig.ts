import 'dotenv/config';
import { Browser, BrowserContext, chromium, firefox, Page } from '@playwright/test';
import { logger } from '../utils/loggerUtil';

type SupportedBrowser = 'chromium' | 'firefox';

class BrowserContextConfig {
  page!: Page;
  browserContext!: BrowserContext;
  private browser!: Browser;

  async launchBrowser() {
    const browserName = (process.env.BROWSER || 'chromium') as SupportedBrowser;

    const browserType = {
      chromium,
      firefox,
    }[browserName];

    if (!browserType) {
      throw new Error(`Unsupported browser: ${browserName}. Use chromium | firefox`);
    }

    this.browser = await browserType.launch({
      headless: false,
      args: browserName === 'chromium' ? ['--start-maximized'] : [],
    });

    logger.info('Browser launced successfully');
  }

  async createContextAndPage(scenario: string) {
    this.browserContext = await this.browser.newContext({
      viewport: null,
      baseURL: process.env.BASE_URL,
    });
    this.page = await this.browserContext.newPage();

    logger.info('Browser context created successfully' + ' -- ' + scenario);
  }

  async closeBrowserContext() {
    if (this.browserContext) {
      await this.browserContext.close();
      logger.info('Browser context closed successfully');
    }
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      logger.info('Browser closed successfully');
    }
  }
}

export default new BrowserContextConfig();
