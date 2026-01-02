import { Given, When, Then } from '@cucumber/cucumber';
import browserContextConfig from '../../support/webConfig';
import Loginpage from '../../pages/loginPage';

let loginPage: Loginpage;

Given('customer navigates to the login url', async function () {
	loginPage = new Loginpage(browserContextConfig.page);
	await loginPage.navigateTo('/index.php?rt=account/login');
});

When(
	'customer provides wrong {string} as username',
	async function (name: string) {
		await loginPage.enterLoginName(name);
	}
);

When('provides wrong {string} as password', async function (password: string) {
	await loginPage.enterPassword(password);
});

Then('error message is shown', async function () {
	await loginPage.clickLogin();
	await loginPage.assertErrorMessage(
		'Error: Incorrect login or password provided.'
	);
});
