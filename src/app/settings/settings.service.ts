import { Injectable } from '@angular/core';
import { RecordsService } from '@app/core/records.service';
import { DataService } from '@app/core/data.service';
import { Setting } from './setting.model'

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends RecordsService<Setting> {

  constructor(
    public dataService: DataService<Setting>,
  ) {
    super(Setting, dataService);
  }

}
