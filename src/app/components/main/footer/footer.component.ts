import { Component, HostBinding, VERSION } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @HostBinding('class') classes = 'footer';
  private codebase = 'GitHub (MIT, ng' + VERSION.full + ')';
  private copyright: string = '© ' + formatDate(Date.now(), 'yyyy', 'en') + ' Mike Goodstadt';

  public legalmenu: any[] = [
    { title: this.copyright, link: 'https://mikegoodstadt.com' },
    { title: this.codebase, link: 'https://github.com/mikegoodstadt/hhrr-app' },
    { title: 'Docker Container', link: 'https://hub.docker.com/r/mikegoodstadt/hhrr-app' }
  ];

}
