import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {IndexComponent} from './index.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: IndexComponent
			}
		]),
		CommonModule,
	],
	declarations: [
		IndexComponent
	],
	exports: [
		RouterModule
	]
})
export class IndexRoutingModule {
}
