import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { PageManager } from "../pages/pageManager";

test.describe("Login", () => {
	const username = loginData.loggedUserName;
	let pm: PageManager;

	test.beforeEach(async ({ page }, testInfo) => {
		console.log(
			`Test "${testInfo.title}" rozpoczęty o: ${new Date().toISOString()}`
		);
		const url = "https://www.sklep.pw.edu.pl/";
		await page.goto(url);
		pm = new PageManager(page);
	});

	test.afterEach(async ({}, testInfo) => {
		console.log(
			`Test "${
				testInfo.title
			}" zakończony o: ${new Date().toISOString()} z wynikiem: ${
				testInfo.status
			}`
		);
	});

	//Przypadek testowy nr 7 ("Logowanie — z poprawnymi danymi")
	test("loginWithCorrectData", async () => {
		//arrange
		const password = loginData.password;

		//act
		await pm.goToMainPage().goToMyAccountPage();
		await pm.goToMyAccountPage().enterUsername(username);
		await pm.goToMyAccountPage().enterPassword(password);
		await pm.goToMyAccountPage().clickLoginButton();

		//assert
		const loggedHeader = await pm.goToMyAccountPage().getLoggedHeader();
		await expect(loggedHeader).toContainText(username);
		await expect(await pm.goToMyAccountPage().getLogoutButton()).toBeVisible();
	});

	//Przypadek testowy nr 8 ("Logowanie — z niepoprawnymi danymi")
	test("loginWithIncorrectPassword", async () => {
		//arrange
		const passwordIncorrect = "test";

		//act
		await pm.goToMainPage().goToMyAccountPage();

		await pm.goToMyAccountPage().enterUsername(username);
		await pm.goToMyAccountPage().enterPassword(passwordIncorrect);
		await pm.goToMyAccountPage().clickLoginButton();
		let message = await pm.goToMyAccountPage().getErrorMessage();

		//assert
		await expect(message).toContainText("BŁĄD");
	});
});
