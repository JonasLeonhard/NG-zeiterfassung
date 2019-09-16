import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ListElementService } from 'src/app/services/list-element.service';

@Component({
  selector: 'app-template-header',
  templateUrl: './template-header.component.html',
  styleUrls: ['./template-header.component.css']
})
export class TemplateHeaderComponent implements OnInit {


  constructor(
    private translate: TranslateService,
    private router: Router,
    public listElementService: ListElementService
    ) {
    console.log(translate.getLangs());
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  useLayout(layout: string) {
    console.log("layout!:" + layout);

    if (layout === "Layout 1") {
      // this.router.navigate(['/']);
      this.listElementService.setCssState(1);
    } else if (layout === "Layout 2") {
      // this.router.navigate(['/layout']);
      this.listElementService.setCssState(0);
    }
  }

  ngOnInit() {
  }

}
