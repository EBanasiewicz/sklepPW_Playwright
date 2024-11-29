import { ElementHandle, Locator, Page } from "@playwright/test";
import { CartPage } from "./cart.page";

export class ProductListPage {
	constructor(private page: Page) {}

	private goToCartButton = this.page.getByTitle("Zobacz koszyk");
	private miniCartIcon = this.page.locator("#site-header-cart");
	private miniCart = this.page.locator("#widget_shopping_cart_content");
	private searchInfoMessage = this.page.locator(".woocommerce-info");
	private searchResults = this.page.$$("//a//h2");
	private itemInMiniCart = this.page.locator(
		"//li[contains(@class, 'mini_cart_item')]"
	);

	public async getSearchResults(): Promise<ElementHandle[]> {
		return this.searchResults;
	}

	public async getRelevantSearchResults(
		searchResults: ElementHandle[],
		query: string
	): Promise<ElementHandle[]> {
		let filteredResults: ElementHandle[] = [];
		for (const element of searchResults) {
			const textContent = await element.textContent();
			if (
				textContent &&
				textContent.toLowerCase().includes(query.toLowerCase())
			) {
				await filteredResults.push(element);
			}
		}
		return filteredResults;
	}

	public async getNumberofIrrelevantSearchResults(
		searchResults: ElementHandle[],
		query: string
	): Promise<number> {
		let irrelevantResults = 0;
		for (const element of searchResults) {
			const textContent = await element.textContent();
			if (textContent && textContent.toLowerCase().includes(query)) {
			} else {
				irrelevantResults++;
			}
		}
		return irrelevantResults;
	}

	public async addToCart(product: string): Promise<ProductListPage> {
		await this.page.getByLabel(`Dodaj „` + product + `” do koszyka`).click();
		return this;
	}

	public async goToCart(): Promise<CartPage> {
		await this.goToCartButton.click();
		return new CartPage(this.page);
	}

	public async getMiniCart(): Promise<Locator> {
		return this.miniCart;
	}

	public async hooverOnMinicart(): Promise<ProductListPage> {
		this.miniCartIcon.hover;
		return this;
	}

	public async getItemFromMinicart(productName: string): Promise<Locator> {
		return this.page.locator(
			`//div[@class = 'widget_shopping_cart_content']//a[text()[contains(.,"${productName}")]]`
		);
	}

	public async checkIfItemInMinicart(productName: string): Promise<boolean> {
		return (await this.getItemFromMinicart(productName)).isVisible();
	}

	public async getSearchInfoMessage(): Promise<string> {
		return this.searchInfoMessage.innerText();
	}
}
