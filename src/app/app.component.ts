import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ListElementService } from './services/list-element.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'zeiterfassung';


  constructor(
    private translate: TranslateService,
    public listElementService: ListElementService) {
    translate.setDefaultLang('en');
    translate.addLangs(['de']);
    this.useLanguage('de');
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

}
