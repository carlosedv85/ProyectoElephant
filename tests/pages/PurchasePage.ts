import { Page,expect } from '@playwright/test';
export class PurchasePage {
	constructor(private page: Page) {}
	
	async comprar() {
	    await this.page.getByRole('button', { name: 'Buy Now' }).click();
		await this.page.waitForLoadState();
    }
	async ingresarNumeroTarjeta(cardNumber: string) {
		await this.page.getByRole('textbox', { name: 'Card Number' }).fill(cardNumber);
	}
	async ingresarCVV(cvv: string) {
		await this.page.getByRole('textbox', { name: 'CVV Code' }).fill(cvv);
	}
	async ingresarMesVencimiento(mesVenc: string) {
		await this.page.locator('#month').selectOption(mesVenc);
	}
	async ingresarAnoVencimiento(anoVenc: string) {
		await this.page.locator('#year').selectOption(anoVenc);
	}
	async darClicPagar() {
		await this.page.getByRole('button', { name: 'Pay' }).click();
	}
	async verificarCompraExitosa() {
		await this.page.waitForLoadState();
	}

}