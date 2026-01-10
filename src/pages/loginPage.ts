import { expect, Locator, Page } from '@playwright/test';

class Loginpage {
  private readonly loginNameElement: Locator;
  private readonly passwordElement: Locator;
  private readonly loginBtnElement: Locator;
  private readonly errorMsgElement: Locator;

  constructor(private page: Page) {
    this.loginNameElement = page.locator('#loginFrm_loginname');
    this.passwordElement = page.locator('#loginFrm_password');
    this.loginBtnElement = page.getByRole('button', { name: 'Login' });
    this.errorMsgElement = page.getByText('Error: Incorrect login or password provided.');
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async enterLoginName(name: string) {
    await this.loginNameElement.fill(name);
  }

  async enterPassword(password: string) {
    await this.passwordElement.fill(password);
  }

  async clickLogin() {
    await this.loginBtnElement.click();
  }

  async userLogin(name: string, password: string) {
    await this.enterLoginName(name);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async assertErrorMessage(message: string) {
    await expect(this.errorMsgElement).toContainText(message);
  }
}

export default Loginpage;
