import { test, expect } from "@playwright/test";
import { PageManager } from "../pages/pageManager.ts";
import { ProductPage } from "../pages/product.page.ts";
import { MainPage } from "../pages/main.page.ts";

test.describe("Cart", () => {
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

	//Przypadek testowy nr 3 ("Dodanie produktu do koszyka")
	test("addToCartSuccess", async ({ page }) => {
		//arrange
		const querriedItem = "kubek";
		const pickedItem = "Kubek PW";

		//act
		await pm.goToMainPage().performSearch(querriedItem);
		await pm.goToProductListPage().addToCart(pickedItem);
		await pm.goToProductListPage().goToCart();
		await page.screenshot({ path: "screenshots/addToCartSuccess_cart.png" });

		//assert
		await expect(
			await pm.goToCartPage().getItemFromCart(pickedItem)
		).toBeVisible();
		let resultList = await pm.goToCartPage().getSearchResults();
		await expect(resultList.count()).resolves.toEqual(1);
	});

	//Przypadek testowy nr 4 ("Dodanie produktu do koszyka — produkt z opcjami — rozmiar, rodzaj")
	test("addToCartProductWithOptionsSuccess", async () => {
		//arrange
		const querriedItem = "Bluza bejsbolówka";
		const quantity = "2";
		const type = "Damska";
		const size = "XL";
		const expectedMessage =
			`Zobacz koszyk\n` +
			quantity +
			` × „` +
			querriedItem +
			`” zostało dodanych do koszyka.`;
		const expectedProductString = querriedItem + ` - ` + type + `, ` + size;

		//act
		await pm.goToMainPage().performSearch(querriedItem);
		await pm.goToProductPage().selectTypeFromTheList(type);
		await pm.goToProductPage().selectSizeFromTheList(size);
		await pm.goToProductPage().setProductQuantity(quantity);
		await pm.goToProductPage().addToCart();
		let messageText = await pm.goToProductPage().getConfirmationMessage();
		await pm.goToProductPage().proceedToCart();

		//assert
		await expect(messageText).toContain(expectedMessage);
		await expect(
			await pm.goToCartPage().getItemFromCart(expectedProductString)
		).toBeVisible();
	});

	//Przypadek testowy nr 5 ("Dodanie produktu do koszyka — produkt z opcjami — bez wybrania opcji")
	test("addToCartProductWithOptionsFail", async ({ page }) => {
		//arrange
		const querriedItem = "Bluza bejsbolówka";
		let alertMessage = "";
		const expectedAlertMsg =
			"Wybierz opcje produktu przed dodaniem go do koszyka.";

		//act
		await pm.goToMainPage().performSearch(querriedItem);

		page.on("dialog", async (dialogWindow) => {
			alertMessage = await dialogWindow.message();
			await dialogWindow.accept();
		});

		await Promise.all([
			page.waitForEvent("dialog", { timeout: 5000 }),
			pm.goToProductPage().addToCart(),
		]);

		//assert
		await expect(alertMessage).toEqual(expectedAlertMsg);
	});

	//Przypadek testowy nr 6 ("Sprawdzenie zawartości minikoszyka")
	test("checkContentsOfMinicart", async () => {
		//arrange
		const querriedItem = "kubek";
		const pickedItem = "Kubek PW";

		//act
		await pm.goToMainPage().performSearch(querriedItem);
		await pm.goToProductListPage().addToCart(pickedItem);
		await pm.goToProductListPage().hooverOnMinicart();

		//assert
		await expect(await pm.goToProductListPage().getMiniCart()).toBeVisible;
		await expect(
			await pm.goToProductListPage().getItemFromMinicart(pickedItem)
		).toBeVisible();
	});
});
