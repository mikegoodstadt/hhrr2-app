import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@app/ui/ui.module';

import { RecordsComponent } from './components/records/records.component';

@NgModule({
  declarations: [
    RecordsComponent,
  ],
  imports: [
    CommonModule,
    UiModule,
  ],
  exports: [
    RecordsComponent,
  ],
})
export class CoreModule { }
