import { Page,expect } from '@playwright/test';
export class GenerateCardPage {
    constructor(private page: Page) {}
    async generarTarjeta() {
        await this.page.getByRole('link', { name:'Generate Card Number'}).click();
        const page2=await this.page.waitForEvent('popup');
        await page2.waitForLoadState();
        return page2;
    }
    async copiarNumTarjeta(page2: Page) {
        const numTarjeta = await page2.getByRole('heading', { name: 'Card Number' }).textContent();
        console.log('Número de tarjeta:', numTarjeta.match(/\d{16}/)[0]);
        return numTarjeta.match(/\d{16}/)[0];
        
    }
    async copiarCVV(page2: Page) {
        const cvv = await page2.getByRole('heading', { name: 'CVV:-' }).textContent();
        console.log('CVV:', cvv.match(/\d{3}/)[0]);
        return cvv.match(/\d{3}/)[0];
    }
    async copiarFechaVenc(fecha: string, page2: Page) {
        const fechaVenc = await page2.getByRole('heading', { name: 'Exp:-' }).textContent();
        const fechaFormateada = fechaVenc.match(/\d{2}\/\d{4}/)[0];
        console.log('Fecha de vencimiento:', fechaFormateada);
        const [mes, ano] = fechaFormateada.split('/');
        if (fecha === 'mes') {
            return mes;
        } else if (fecha === 'ano') {
            return ano;
        }
    }
    async copiarMontoLimite(page2: Page) {
        const montoLimite = await page2.getByRole('heading', { name: 'Credit Limit' }).textContent();
        console.log('Monto límite:', montoLimite.match(/\d+/)[0]);
        return montoLimite.match(/\d+/)[0];

    }
    async cerrarVentana(page2: Page) {
        await page2.close();
    }
}