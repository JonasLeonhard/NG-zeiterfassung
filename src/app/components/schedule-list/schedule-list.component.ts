import { Component, OnInit } from '@angular/core';
import { ListElement } from '../../models/list-element';
import { Eventping } from 'src/app/models/eventping';

import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { ListElementService } from 'src/app/services/list-element.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  /**
   * This Component handles the Two Lists (..open and ..done).
   *
   * It Create a schedule-list-element for each ListElement: (*ngFor..)
   * It passes the ListElement in the forloop to the component:
   * [ListElement$]="listElement"
   *
   * It gets both Arrays from list-element.service.
   *
   * It also implements DragulaService for Drag&Drop
   */

  // handles if list-element is shown in shedule-list
  public showListElementsopen: boolean;
  public showListElementsdone: boolean;

  // Data Arrays from list-element.service
  public $listElements: ListElement[];
  public $listElementsDone: ListElement[];

  // dragula for Drag&Drop
  BAG = 'DRAGULA_EVENTS';
  subs = new Subscription();

  constructor(
    public listElementService: ListElementService,
    public dragulaService: DragulaService,
    private translate: TranslateService
    ) {

    this.showListElementsopen = true;
    this.showListElementsdone = false;


    /**
     * DRAGULA SERVICE: States -> onDrag, onDrop, onOver, onOut:
     */
    this.subs.add(dragulaService.drag(this.BAG)
      .subscribe(({ el }) => {
        console.log('drag', el);
      })
    );
    this.subs.add(dragulaService.drop(this.BAG)
      .subscribe(({ el }) => {
        console.log('drop', el);
        this.position();    // update Positions in Array
      })
    );
    this.subs.add(dragulaService.over(this.BAG)
      .subscribe(({ el, container }) => {
        console.log('over', container);
      })
    );
    this.subs.add(dragulaService.out(this.BAG)
      .subscribe(({ el, container }) => {
        console.log('out', container);
      })
    );

    // get Elements[] from Service
    this.$listElements = this.listElementService.getListElements();
    this.$listElementsDone = this.listElementService.getListElementsdone();
  }

  ngOnInit() {
    this.orderListElements();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public position(): void {
    console.log('Dropped Element: Reorder ListElements');
    this.listElementService.assign("position");
  }

  public orderListElements(): void {
    // Call Service to Order List Elements by Position
    console.log('orderListElements');
    this.listElementService.orderListElementsPosition();
  }

  public update($event: Eventping): void {
    // @DEPRECATED!
    console.log(`%c"${$event.label}-Event" got triggered on : ${$event.object.label}`, `color: green`);
  }

  toggleOpen() {
    this.showListElementsopen = !this.showListElementsopen;
    this.logLists();
  }

  toggleDone() {
    this.showListElementsdone = !this.showListElementsdone;
    this.logLists();
  }

  logLists(): void {
    console.log('schedule-lists:');
    console.log(this.$listElements);
    console.log(this.$listElementsDone);
    console.log('service-lists:');

    console.log(this.listElementService.getListElements());
    console.log(this.listElementService.getListElementsdone());
  }
}
