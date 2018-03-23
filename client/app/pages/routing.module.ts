import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';

import {IndexRoutingModule} from './index/index.module';

@NgModule({
	imports: [
		RouterModule.forRoot([], {
			useHash: true,
			preloadingStrategy: PreloadAllModules
		}),
		IndexRoutingModule
	],
	exports: [
		RouterModule
	]
})
export class RoutingModule {}
