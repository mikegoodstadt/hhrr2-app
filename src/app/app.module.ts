import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { UiModule } from '@app/ui/ui.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
