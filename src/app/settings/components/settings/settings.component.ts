import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/settings/settings.service';
import { Observable } from 'rxjs';
import { Setting } from '@app/settings/setting.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public settings: Observable<Setting>;

  constructor(
    public stgsService: SettingsService,
  )
   {
    this.settings = this.stgsService.getRecord();
   }

  ngOnInit(): void {
  }

}
