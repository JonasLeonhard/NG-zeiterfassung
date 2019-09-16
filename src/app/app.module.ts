import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { TemplateHeaderComponent } from './components/template-header/template-header.component';
import { ScheduleListFormComponent } from './components/schedule-list/schedule-list-form/schedule-list-form.component';
import { ScheduleListElementComponent } from './components/schedule-list/schedule-list-element/schedule-list-element.component';
import { FormDialogComponent } from './components/schedule-list/schedule-list-form/form-dialog/form-dialog.component';

import { DragulaModule } from 'ng2-dragula';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { ListElementService } from './services/list-element.service';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ScheduleListComponent,
    TemplateHeaderComponent,
    ScheduleListFormComponent,
    ScheduleListElementComponent,
    FormDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragulaModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [ListElementService, TranslateService],
  bootstrap: [AppComponent],
  entryComponents: [FormDialogComponent]
})

export class AppModule { }
