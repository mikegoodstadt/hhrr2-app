import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsComponent } from './components/records/records.component';

@NgModule({
  declarations: [
    RecordsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    RecordsComponent,
  ],
})
export class CoreModule { }
