import { Page,expect } from '@playwright/test';
export class OrderPage {
    constructor(private page: Page) {}
    async obtenerOrdenID() {
        const mensajePago = await this.page.locator('td:has-text("Order ID") + td strong').textContent();
        console.log(mensajePago);
    }
    async clicHome() {
        await this.page.locator('a.button.special').click();
    }
    async irPrincipal(){
        await this.page.waitForLoadState();
    }
}