import { Component, OnInit, HostBinding, Input } from '@angular/core';
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @HostBinding('class') classes = 'menu';
  @Input() public menu: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
