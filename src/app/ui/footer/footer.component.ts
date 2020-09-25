import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @HostBinding('class') classes = 'footer';
  @Input() menu: string[] = [];

}
