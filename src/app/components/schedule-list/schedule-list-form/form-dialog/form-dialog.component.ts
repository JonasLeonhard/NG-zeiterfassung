import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListElementService } from 'src/app/services/list-element.service';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {
  /**
   * This is the DialogComponent, that gets created in a new Dialog,
   * It closes the Dialog onSubmit/ onExit
   */
  constructor(
    public listElementService: ListElementService,
    public dialog: MatDialog,
    private translate: TranslateService
    ) { }

  ngOnInit() {
  }

  public onSubmit($event: any): void {
    console.log('submitted: ' + $event);
  }

  public exitForm() {
    console.log('form exit');
    this.dialog.closeAll();
  }

  public submitForm() {
    console.log('form submit');
    this.dialog.closeAll();
    this.listElementService.$form.reset();
    this.listElementService.newFormGroup();
  }
}
