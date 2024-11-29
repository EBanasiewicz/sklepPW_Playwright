import { Page, expect } from "@playwright/test";
import { MainPage } from "../pages/main.page";
import { MyAccountPage } from "../pages/myaccount.page";
import { CartPage } from "../pages/cart.page";
import { ProductPage } from "../pages/product.page";
import { CheckoutPage } from "../pages/checkout.page";
import { ProductListPage } from "../pages/productList.page";

export class PageManager {
	private readonly page: Page;
	private mainPage: MainPage;
	private myAccountPage: MyAccountPage;
	private cartPage: CartPage;
	private productPage: ProductPage;
	private checkoutPage: CheckoutPage;
	private productListPage: ProductListPage;

	constructor(page: Page) {
		this.page = page;
	}

	goToMainPage() {
		if (!this.mainPage) {
			this.mainPage = new MainPage(this.page);
		}
		return this.mainPage;
	}

	goToMyAccountPage() {
		if (!this.myAccountPage) {
			this.myAccountPage = new MyAccountPage(this.page);
		}
		return this.myAccountPage;
	}

	goToCartPage() {
		if (!this.cartPage) {
			this.cartPage = new CartPage(this.page);
		}
		return this.cartPage;
	}

	goToProductPage() {
		if (!this.productPage) {
			this.productPage = new ProductPage(this.page);
		}
		return this.productPage;
	}

	goToCheckoutPage() {
		if (!this.checkoutPage) {
			this.checkoutPage = new CheckoutPage(this.page);
		}
		return this.checkoutPage;
	}

	//"lazy initialization"
	goToProductListPage() {
		if (!this.productListPage) {
			this.productListPage = new ProductListPage(this.page);
		}
		return this.productListPage;
	}
}
