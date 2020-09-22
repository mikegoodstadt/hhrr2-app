import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
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
