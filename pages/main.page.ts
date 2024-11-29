import { Page } from "@playwright/test";
import { MyAccountPage } from "./myaccount.page";
import { ProductListPage } from "./productList.page";
import { ProductPage } from "./product.page";

export class MainPage {
	constructor(private page: Page) {}

	myAccountTabButton = this.page.getByRole("link", { name: "Moje konto" });
	searchBar = this.page.getByRole("searchbox", { name: "Szukaj:" });

	async performSearch(querriedItem: string): Promise<ProductListPage> {
		await this.searchBar.fill(querriedItem);
		await this.searchBar.press("Enter");
		return new ProductListPage(this.page);
	}

	async performUniqueItemSearch(querriedItem: string): Promise<ProductPage> {
		await this.searchBar.fill(querriedItem);
		await this.searchBar.press("Enter");
		return new ProductPage(this.page);
	}

	async goToMyAccountPage(): Promise<MyAccountPage> {
		await this.myAccountTabButton.click();
		return new MyAccountPage(this.page);
	}
}
