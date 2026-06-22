import { Page,expect } from '@playwright/test';
export class CheckCreditPage {
    constructor(private page: Page) {}
    async check(){
        await this.page.getByRole('link', { name:'Check Credit Card Limit'}).click();
        await this.page.waitForLoadState();
    }
    async consultarTarjeta(tarjeta: string){
        await this.page.getByRole('textbox',{name:'Enter Credit Card Number'}).fill(tarjeta);
    }
    async submit(){
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }
    async cargar(){
        await this.page.waitForLoadState();
    }

}