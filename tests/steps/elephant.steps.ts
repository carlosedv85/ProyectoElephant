import {Given, When, Then} from '@cucumber/cucumber';
import {CustomWorld} from '../support/world';
import { IndexPage } from '../pages/IndexPage';
import { GenerateCardPage } from '../pages/GenerateCardPage';
import { PurchasePage } from '../pages/PurchasePage';
import { OrderPage } from '../pages/OrderPage';
import { CheckCreditPage } from '../pages/CheckCreditPage';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { Page } from 'playwright/test';

setDefaultTimeout(30 * 1000);

let indexPage: IndexPage;
let generateCardPage: GenerateCardPage;
let purchasePage: PurchasePage;
let orderPage: OrderPage;
let checkCreditPage: CheckCreditPage;
let page2: Page;
let cardNumber: string;
let cvv: string;
let mesVenc: string;
let anoVenc: string;
let limcred: string;
let precioUnitario: number;
let precioTotal: number;

Given('Ingreso a la pagina de DemoGuru99', async function (this: CustomWorld) {
    indexPage = new IndexPage(this.page);
    await indexPage.ingresoALaWeb();
});

When('Cuando doy clic en generar tarjeta', async function (this: CustomWorld) {
    generateCardPage = new GenerateCardPage(this.page);
    page2=await generateCardPage.generarTarjeta();
});

When('Copio el número de tarjeta', async function (this: CustomWorld) {
    cardNumber = await generateCardPage.copiarNumTarjeta(page2);
});

When('Copio el número de CVV', async function (this: CustomWorld) {
    cvv = await generateCardPage.copiarCVV(page2);
});
When('Copio la fecha de vencimiento', async function (this: CustomWorld) {
    mesVenc = await generateCardPage.copiarFechaVenc('mes', page2);
    anoVenc = await generateCardPage.copiarFechaVenc('ano', page2);
});
When('Copio el monto límite', async function (this: CustomWorld) {
    limcred = await generateCardPage.copiarMontoLimite(page2);
});
When('Cierro la ventana de la tarjeta', async function (this: CustomWorld) {
    await generateCardPage.cerrarVentana(page2);
});
When('Capturo el monto individual del producto', async function (this: CustomWorld) {
    precioUnitario = await indexPage.obtenerPrecioUnitario();
});
When('Selecciono la cantidad del producto a comprar', async function (this: CustomWorld) {
    precioTotal = await indexPage.seleccionarCantidad(2,precioUnitario);
});
When('Doy clic en comprar', async function (this: CustomWorld) {
    purchasePage = new PurchasePage(this.page);
    await purchasePage.comprar();
});
When('Ingreso el número de tarjeta', async function (this: CustomWorld) {
    await purchasePage.ingresarNumeroTarjeta(cardNumber);
});
When('Ingreso el mes de vencimiento', async function (this: CustomWorld) {
    await purchasePage.ingresarMesVencimiento(mesVenc);
});
When('Ingreso el año de vencimiento', async function (this: CustomWorld) {
    await purchasePage.ingresarAnoVencimiento(anoVenc);
});
When('Ingreso el CVV', async function (this: CustomWorld) {
    await purchasePage.ingresarCVV(cvv);
});
When('Doy clic en pagar', async function (this: CustomWorld) {
    await purchasePage.darClicPagar();
});
Then('Me muestra el mensaje de pago exitoso', async function (this: CustomWorld) {
    await purchasePage.verificarCompraExitosa();
});
Then('El número de orden de compra', async function (this: CustomWorld) {

    orderPage = new OrderPage(this.page);
    await orderPage.obtenerOrdenID();
});
Then('Doy clic en Home', async function (this: CustomWorld) {
    await orderPage.clicHome();
});
Then('Regreso a la pantalla principal', async function (this: CustomWorld) {
    await orderPage.irPrincipal();
});
Then('Doy clic en revisar límite de crédito', async function (this: CustomWorld) {
    checkCreditPage = new CheckCreditPage(this.page);
    await checkCreditPage.check();
});
Then('Ingreso el valor de la tarjeta', async function (this: CustomWorld) {
    await checkCreditPage.consultarTarjeta(cardNumber);
});
Then('Doy clic en submit', async function (this: CustomWorld) {
    await checkCreditPage.submit();
});
Then('Me muestra los datos de compra', async function (this: CustomWorld) {
    await checkCreditPage.cargar();
});
    