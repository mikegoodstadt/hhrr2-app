import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public currentUser = true;
  public topmenu: any[] = [
    { title: 'Employees', route: 'employees' },
    { title: 'Departments', route: 'departments' },
    { title: 'Settings', icon: 'settings', route: 'settings' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
