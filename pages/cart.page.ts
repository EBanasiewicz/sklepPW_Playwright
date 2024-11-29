import { ElementHandle, Locator, Page } from "@playwright/test";
import { CheckoutPage } from "./checkout.page";

export class CartPage {
	constructor(private page: Page) {}

	checkoutButton = this.page.locator(
		"//a[contains(@class, 'checkout-button')]"
	);
	productNamesList = this.page.locator(
		"//tr[contains(@class,'cart-item')]//td[@class = 'product-name']//a"
	);

	public async getSearchResults(): Promise<Locator> {
		return this.productNamesList;
	}

	public async goToCheckout(): Promise<CheckoutPage> {
		await this.checkoutButton.click();
		return new CheckoutPage(this.page);
	}

	public async getItemFromCart(item: string): Promise<Locator> {
		return this.page.getByRole("link", { name: item, exact: true });
	}
}
