import {NgModuleRef} from '@angular/core';

export interface Environment {
	production: boolean;
	ENV_PROVIDERS: any;
	showDevModule: boolean;

	decorateModuleRef(modRef: NgModuleRef<any>): NgModuleRef<any>;
	bootstrap(main: () => Promise<NgModuleRef<any>>, module: any): void;
}
