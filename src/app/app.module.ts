import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppStore } from './app.store';
import { createStore, Store, compose, StoreEnhancer, } from 'redux';
import { AppState, default as reducer } from './_reducers/index';

const devtools: StoreEnhancer<AppState> =
  window['devToolsExtension'] ?
    window['devToolsExtension']() : f => f;

const store: Store<AppState> = createStore<AppState>(
  reducer,
  compose(devtools)
);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide: AppStore, useFactory: () => store }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
