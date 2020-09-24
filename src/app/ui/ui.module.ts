import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/ui/ui-material.module';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { DialogComponent } from './dialog/dialog.component';
import { EditorComponent } from './editor/editor.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TableComponent } from './table/table.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    DialogComponent,
    EditorComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    TableComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    BreadcrumbsComponent,
    DialogComponent,
    EditorComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    TableComponent,
    SpinnerComponent,
  ],
})
export class UiModule { }
