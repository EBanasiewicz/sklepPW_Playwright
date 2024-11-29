import { Page } from "@playwright/test";

export class CheckoutPage {
	constructor(private page: Page) {}

	public async getCurrentUrl(): Promise<String> {
		return this.page.url();
	}
}
