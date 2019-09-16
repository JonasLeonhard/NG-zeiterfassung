import { NgModule } from '@angular/core';

// import materials here and add them to exports
import {MatDialogModule} from '@angular/material/dialog';
import { MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule } from '@angular/material';

const MaterialComponents = [
  // add imported Module here:
  MatDialogModule
];

@NgModule({
  imports: [
    MaterialComponents,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  exports: [
    MaterialComponents,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
