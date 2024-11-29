import { Page } from "@playwright/test";
import { CartPage } from "./cart.page";

export class ProductPage {
	constructor(private page: Page) {}

	private typeSelect = this.page.getByLabel("Rodzaj");
	private sizeSelect = this.page.getByLabel("Rozmiar");
	private quantityInput = this.page.getByLabel("Ilość produktu");
	private submitButton = this.page.getByRole("button", {
		name: "Dodaj do koszyka",
	});
	private messageText = this.page.locator(
		"//div[@class = 'woocommerce-message']"
	);
	private goToCartButton = this.page
		.locator("#content")
		.getByRole("link", { name: "Zobacz koszyk " });

	public async selectSizeFromTheList(size: string): Promise<ProductPage> {
		await this.sizeSelect.selectOption(size);
		return this;
	}

	public async selectTypeFromTheList(type: string): Promise<ProductPage> {
		await this.typeSelect.selectOption(type);
		return this;
	}

	public async setProductQuantity(quantity: string): Promise<ProductPage> {
		await this.quantityInput.fill(quantity);
		return this;
	}

	public async addToCart(): Promise<ProductPage> {
		await this.submitButton.waitFor({ state: "visible" });
		await this.submitButton.click();
		return this;
	}

	public async getConfirmationMessage(): Promise<string> {
		return this.messageText.innerText();
	}

	public async proceedToCart(): Promise<CartPage> {
		await this.goToCartButton.click();
		return new CartPage(this.page);
	}
}
