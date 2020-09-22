import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './components/shared/shared.module';
import { MainModule } from './components/main/main.module';
import { ViewsModule } from './components/views/views.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MainModule,
    ViewsModule,
  ],
  declarations: [
    AppComponent,
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
