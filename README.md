# Zeiterfassung

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.
It was build in 1 Week.

Used for this Project:
Ng- components, service injection, model,

Ng Material design components - (mat-grid-list, mat-grid-tile, mat-form-field, mat-datepicker, mat-datepicker-toggle, mat-radio-group,
                                  mat-radio-button, mat-error),
                                  
Dragula service - for drag & drop,
ngx-translate - runtime translation, 
internationalization - build translation

Services
|_ list-element.service

Components
|_ schedule-list
|     |_ schedule-list-element
|     |_ schedule-list-form
|           |_ form-dialog
|_ template-header

Models
|_ list-element.ts

___________
List-element.service is injected into schedule-list and children components. 
It implements an Array of ListElements[] and ListElementsDone[], the Service is called when changes in other components change the model. Fx. when submitting a new element in form-dialog, deleting or updating an element in schedule-list-element.
It also handles the current state of the layout.
It handles the dialog-form form.

___________
Schedule-list creates a schedule-list-element for each listelement passed by the list-element.service.
It puts the listelement into $listElements/$listElementsdone depending on its status.
It implements Dragula drag & drop service.

___________
Schedule-list-form handles the input to create a new element. It opens a form-dialog in a new materials MatDialog service 'DialogWindow'.
It passes the input to listElementService wich handles the FormInput of the DialogWindow.

___________
Dialog-form implements the materials dialog. The components gets created by MatDialog service in schedule-list-form.
It implements the formGroup "listElementService.$form", wich gets handled in listElementService on Submit.

Angular Material Design components used in the dialog are: 
mat-grid-list, mat-grid-tile, mat-form-field, 
mat-datepicker, mat-datepicker-toggle, mat-radio-group,
mat-radio-button, mat-error.  

The Form calls listElementService.submitForm() to create a new ListElement. 

___________
Template-header implements the buttons to change the layout and language. 
To change the language ngx-translate's TranslateService gets injected into the constructor.
When changin a Language useLanguage() gets called, and changes the language by using /assets/i18n/lang.json file.
When changin a Layout useLayout() gets called, this changes the cssState in listElementService.


## Development server

Run `ng serve` or `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## App Screenshots

### Create time tracker elements.
![Mask](../master/git-readme/Screen01.png)

### Delete elements or add to past tracking elements.
![Mask](../master/git-readme/Screen02.png)

### Element creation dialog.
![Mask](../master/git-readme/Screen03.png)

### Change Layout and Language
![Mask](../master/git-readme/Screen04.png)
![Mask](../master/git-readme/Screen05.png)

### Drag & Drop to order elements.
![Mask](../master/git-readme/Screen06.png)


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


