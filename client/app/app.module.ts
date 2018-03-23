// Angular
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RoutingModule} from './pages/routing.module';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		RoutingModule,
	]
})

export class AppModule {
}
