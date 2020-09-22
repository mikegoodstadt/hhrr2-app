import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing.module';
import { SharedModule } from '@app/components/shared/shared.module';

import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
  ],
  declarations: [
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  exports: [
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
})
export class MainModule { }
