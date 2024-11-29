import { test, expect } from "@playwright/test";
import { PageManager } from "../pages/pageManager";

test.describe("Checkout", () => {
	let pm: PageManager;
	const url = "https://www.sklep.pw.edu.pl/";

	test.beforeEach(async ({ page }, testInfo) => {
		console.log(
			`Test "${testInfo.title}" rozpoczęty o: ${new Date().toISOString()}`
		);
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

	//Przypadek testowy nr 9 ("Przejście do ekranu płatności")
	test("proceedToCheckout", async () => {
		//arrange
		const querriedItem = "Kubek PW";
		const expectedUrl = `${url}zamowienie`;

		//act
		await pm.goToMainPage().performSearch(querriedItem);
		await pm.goToProductPage().addToCart();
		await pm.goToProductPage().proceedToCart();
		await pm.goToCartPage().goToCheckout();
		let currentUrl = await pm.goToCheckoutPage().getCurrentUrl();

		//assert
		await expect(currentUrl).toBe(expectedUrl);
	});
});
