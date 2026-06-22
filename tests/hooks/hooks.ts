import { Before, After, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import { CustomWorld } from '../support/world';
const browsers = {
 chromium,
 firefox,
 webkit
};


Before(async function (this: CustomWorld) {
 const browserName = process.env.BROWSER || 'chromium';


 this.browserName = browserName;


 const browserType = browsers[browserName as keyof typeof browsers];


 this.browser = await browserType.launch({
   headless: true
 });


 this.context = await this.browser.newContext({
   viewport: {
     width: 1280,
     height: 720
   },
   recordVideo: {
     dir: `reports/videos/${browserName}`
   }
 });


 this.page = await this.context.newPage();
});


After(async function (this: CustomWorld, scenario) {
 if (scenario.result?.status === Status.FAILED) {
   const screenshot = await this.page.screenshot({
     path: `reports/screenshots/${this.browserName}-${scenario.pickle.name}.png`,
     fullPage: true
   });


   await this.attach(screenshot, 'image/png');
 }


 await this.page.close();
 await this.context.close();
 await this.browser.close();
});

