/* tslint:disable */
import {Environment} from './model';
import {ApplicationRef, NgModuleRef} from '@angular/core';
import {enableDebugTools} from '@angular/platform-browser';
import {createInputTransfer, createNewHosts, removeNgStyles} from '@angularclass/hmr';

// Error.stackTraceLimit = Infinity;
require('zone.js/dist/long-stack-trace-zone');

export const environment: Environment = {
	production: false,
	showDevModule: true,

	/** Angular debug tools in the dev console
	 * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
	 * @param modRef
	 * @return {any}
	 */
	decorateModuleRef(modRef: NgModuleRef<any>) {
		const appRef = modRef.injector.get(ApplicationRef);
		const cmpRef = appRef.components[0];

		let _ng = (<any>window).ng;
		enableDebugTools(cmpRef);
		(<any>window).ng.probe = _ng.probe;
		(<any>window).ng.coreTokens = _ng.coreTokens;
		return modRef;
	},
	bootstrap(main: () => Promise<NgModuleRef<any>>, module: any) {
		if (module['hot']) {
			let ngModule: NgModuleRef<any>;
			module.hot.accept();
			main().then(mod => ngModule = mod);
			module.hot.addStatusHandler(arg => console.log(arg));
			module.hot.dispose(() => {
				console.log('Here');
				const
					appRef: ApplicationRef = ngModule.injector.get(ApplicationRef),
					elements = appRef.components.map(c => c.location.nativeElement),
					makeVisible = createNewHosts(elements),
					restoreInputValues = createInputTransfer();
				removeNgStyles();
				ngModule.destroy();
				makeVisible();
				setTimeout(restoreInputValues);
				// appRef.tick(); // TODO: check
			});
		}
		else {
			console.error('HMR is not enabled for webpack-dev-server!');
		}
	},
	ENV_PROVIDERS: []
};
