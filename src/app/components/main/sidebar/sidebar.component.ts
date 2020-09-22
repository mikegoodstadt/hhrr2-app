import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @HostBinding('class') classes = 'sidebar';

  public sidemenu: any[] = [
    { title: '1', route: '/1' },
    { title: '2', route: '/2' },
    { title: '3', route: '/3' }
  ];

}
