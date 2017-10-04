// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { enableProdMode } from '@angular/core';

// import { AppModule } from './app/app.module';

// if (process.env.ENV === 'production') {
//     enableProdMode();
// }

// platformBrowserDynamic().bootstrapModule(AppModule);

exports.printMsg = function () {
    console.log("This is a message from the demo package");
}