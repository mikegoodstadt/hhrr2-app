import { Injectable } from '@angular/core';
import { CrudService } from '@app/core/crud.service';
import { DataService } from '@app/core/data.service';
import { Setting } from './settings.model'

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends CrudService<Setting> {

  constructor(
    public dataService: DataService,
  ) {
    super(Setting, dataService);
  }

}
