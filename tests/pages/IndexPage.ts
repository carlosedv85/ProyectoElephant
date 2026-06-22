import { Page,expect } from '@playwright/test';
export class IndexPage {
    constructor(private page: Page) {}

    async ingresoALaWeb() {
        await this.page.goto('https://demo.guru99.com/payment-gateway/index.php');
   }
    async obtenerPrecioUnitario() {
        const precioValor=await this.page.getByRole('heading', { name: 'Price: $' }).textContent();
        console.log('Precio Unitario:', precioValor.match(/\d+/)[0]);
        return parseFloat(precioValor.match(/\d+/)[0]);
    }
    async seleccionarCantidad(cantidad: number, precioUnitario: number) {
        console.log('Precio Total:', precioUnitario * cantidad);
        await this.page.getByRole('combobox').selectOption({ label: cantidad.toString() });
        return precioUnitario * cantidad;
    }
    
}