import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/app-material.module';

import { CamelSpaced } from '@app/common/camelspaced.pipe';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { DialogComponent } from './dialog/dialog.component';
import { EditorComponent } from './editor/editor.component';
import { MenuComponent } from './menu/menu.component';
import { RecordsComponent } from './records/records.component';
import { TableComponent } from './table/table.component';

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
    DialogComponent,
    EditorComponent,
    MenuComponent,
    RecordsComponent,
    TableComponent,

  ],
  exports: [
    CamelSpaced,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    BreadcrumbsComponent,
    DialogComponent,
    EditorComponent,
    MenuComponent,
    RecordsComponent,
    TableComponent,
  ],
})
export class SharedModule { }
