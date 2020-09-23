import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/app-material.module';

import { CamelSpaced } from '@app/common/camelspaced.pipe';

import { MenuComponent } from './menu/menu.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { DialogComponent } from './dialog/dialog.component';
import { TableComponent } from './table/table.component';
import { DatatableComponent } from './datatable/datatable.component';
import { EditorReactiveComponent } from './editor-reactive/editor-reactive.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  declarations: [
    CamelSpaced,
    BreadcrumbsComponent,
    MenuComponent,
    DialogComponent,
    TableComponent,
    DatatableComponent,
    EditorReactiveComponent,

  ],
  exports: [
    CamelSpaced,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    BreadcrumbsComponent,
    MenuComponent,
    DialogComponent,
    TableComponent,
    DatatableComponent,
    EditorReactiveComponent,
  ],
})
export class SharedModule { }
