import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { UiModule } from '@app/ui/ui.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    UiModule,
  ],
  declarations: [
    AppComponent,
  ],
  exports: [],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
