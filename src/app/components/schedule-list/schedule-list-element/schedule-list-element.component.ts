import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListElement } from '../../../models/list-element';
import { Eventping } from '../../../models/eventping';
import { ListElementService } from 'src/app/services/list-element.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-list-element',
  templateUrl: './schedule-list-element.component.html',
  styleUrls: ['./schedule-list-element.component.css']
})
export class ScheduleListElementComponent implements OnInit {
  /**
   * This Components Displays each Element in  schedule-list.component,
   * it gets passed the Data of its ListElement
   * It can call @Output() -> (emitter)="callsoething()" in parent (schedule-list.html)
   */

  // app component in schedule-list.component.html
  // gets passed [ListElement$]="listElement"
  @Input() ListElement$: ListElement;
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(public listElementService: ListElementService, private translate: TranslateService) {

  }
  ngOnInit() {}

  public toggleCheck($event?: any): void {
    /**
     * When toggling the Check Symbol:
     * Change the stutus of this Element and change
     * it to the other ListElement[] Array
     */
    this.ListElement$.status = !this.ListElement$.status;
    // this.send_EventObj('toggleCheck');
    if (!this.ListElement$.status) {
      this.listElementService.toListElements(this.ListElement$);
     } else {
      this.listElementService.toListElementsDone(this.ListElement$);
     }
  }

  public changeLabel($event: any, $input: string): void {
    /**
     * When submitting a new Label on the input field of element
     */
    console.log('Label of object has changed from: ' + this.ListElement$.label + ' to: ' + $input);
    this.ListElement$.label = $input;
    // this.send_EventObj('changeLabel');
  }

  public deleteElement($event: any): void {
    /**
     * Deletes the ELement in the corresponding array
     * -> status == false -> active list
     */
    if (!this.ListElement$.status) {
      this.listElementService.deleteFromElements(this.ListElement$);
    } else {
      this.listElementService.deleteFromElementsDone(this.ListElement$);
    }
  }

  public send_EventObj($label: string): void {
    // deprecated!
    /**
     * Emits a ListElement Object to the <app-list-element> in
     * Schedule List. There it can call a function in its parent:
     * fx- the (emitter)="update($event)"
     */
    const eventObj: Eventping = {
      label : $label,
      object : this.ListElement$
  };
    this.emitter.emit(eventObj);
  }
}
