import 'dotenv/config';
import { Browser, BrowserContext, chromium, firefox, Page } from '@playwright/test';

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
  }

  async createContextAndPage() {
    this.browserContext = await this.browser.newContext({
      viewport: null,
      baseURL: process.env.BASE_URL,
    });
    this.page = await this.browserContext.newPage();
  }

  async closeBrowserContext() {
    if (this.browserContext) {
      await this.browserContext.close();
    }
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

export default new BrowserContextConfig();
