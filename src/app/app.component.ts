import { Component, OnInit, VERSION } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public currentUser = true;

  public headerMenu: any[] = [
    { title: 'Employees', route: 'employees' },
    { title: 'Departments', route: 'departments' },
    { title: 'Settings', icon: 'settings', route: 'settings' },
  ];
  
  private copyright: string = '© ' + formatDate(Date.now(), 'yyyy', 'en') + ' Mike Goodstadt';
  private codebase = 'GitHub (MIT, ng' + VERSION.full + ')';
  public footerMenu: any[] = [
    { title: this.copyright, link: 'https://mikegoodstadt.com' },
    { title: this.codebase, link: 'https://github.com/mikegoodstadt/hhrr2-app' },
    { title: 'Docker Container', link: 'https://hub.docker.com/r/mikegoodstadt/hhrr2-app' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
