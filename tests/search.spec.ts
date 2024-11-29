import { test, expect } from "@playwright/test";
import { PageManager } from "../pages/pageManager";

test.describe("Search", () => {
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

	//Przypadek testowy nr 1 ("Wyszukanie produktu na stronie — produkt istniejący")
	test("searchSuccess", async () => {
		//arrange
		const query = "bluza";

		//act
		await pm.goToMainPage().performSearch(query);
		const elements = await pm.goToProductListPage().getSearchResults();
		let relevantSearchResults = await pm
			.goToProductListPage()
			.getRelevantSearchResults(elements, query);
		let numberOfIrrelevants = await pm
			.goToProductListPage()
			.getNumberofIrrelevantSearchResults(elements, query);
		let numberOfRelevants = await relevantSearchResults.length;

		//assert
		await expect(numberOfRelevants).toEqual(elements.length);
		await expect(numberOfIrrelevants).toEqual(0);
	});

	//Przypadek testowy nr 2 ("Wyszukanie produktu na stronie — produkt nieistniejący")
	test("searchNoProductsFound", async () => {
		//arrange
		const query = "test12345";
		const message = "Nie znaleziono produktów, których szukasz";
		//act
		await pm.goToMainPage().performSearch(query);
		const searchInfoText = await pm
			.goToProductListPage()
			.getSearchInfoMessage();
		//assert
		await expect(searchInfoText).toContain(message);
	});
});
