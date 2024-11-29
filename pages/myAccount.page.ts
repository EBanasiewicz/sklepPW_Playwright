import { Locator, Page } from "@playwright/test";
import { loginData } from "../test-data/login.data";

export class MyAccountPage {
	constructor(private page: Page) {}

	//private username = loginData.loggedUserName;
	//private password = loginData.password;

	private usernameInput = this.page.getByLabel("Nazwa użytkownika lub adres e");
	private passwordInput = this.page.locator("#password");
	private loginButton = this.page.getByRole("button", { name: "Zaloguj się" });
	private loggedHeader = this.page.locator(
		'xpath = //div[@class = "woocommerce-MyAccount-content"]'
	);
	private logoutButton = this.page.getByRole("link", {
		name: "Wyloguj się",
		exact: true,
	});
	private errorMessage = this.page.locator(
		'xpath = //ul[@class = "woocommerce-error"]//li'
	);

	public async enterUsername(username: string): Promise<MyAccountPage> {
		await this.usernameInput.fill(username);
		return this;
	}

	public async enterPassword(password: string): Promise<MyAccountPage> {
		await this.passwordInput.fill(password);
		return this;
	}

	public async clickLoginButton(): Promise<MyAccountPage> {
		await this.loginButton.click();
		return this;
	}

	public async getLogoutButton(): Promise<Locator> {
		return this.logoutButton;
	}

	public async getLoggedHeader(): Promise<Locator> {
		return this.loggedHeader;
	}

	public async getErrorMessage(): Promise<Locator> {
		return this.errorMessage;
	}

	public async loginWithData(
		username: string,
		password: string
	): Promise<MyAccountPage> {
		await this.enterUsername(username);
		await this.enterPassword(password);
		await this.clickLoginButton();
		return this;
	}
}
