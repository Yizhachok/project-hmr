/**
 * Angular bootstrapping
 */
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from './environments/environment';

import {AppModule} from './app';

/**
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
	return platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.then(environment.decorateModuleRef)
		.catch(err => console.error(err));
}

/**
 * Bootstrap app with environment depending bootstrap
 */
environment.bootstrap(main, module);
