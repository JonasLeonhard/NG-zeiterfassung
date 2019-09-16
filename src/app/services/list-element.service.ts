import { Injectable } from "@angular/core";
import { ListElement } from "../models/list-element";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormDialogComponent } from "../components/schedule-list/schedule-list-form/form-dialog/form-dialog.component";

@Injectable({
  providedIn: "root"
})
export class ListElementService {
  /**
   * This Service keeps track of list-element Data.
   * -It creates, deletes, updates and orders ListElements
   * -It also controls the form-dialog.html Form, that gets
   *  passed into this.$form (FormGroup), wich creates a
   *  new ListElement onSubmit -> this.submitForm()
   *
   * ->It gets injected into schedule-list.component and children
   */
  public $listElements: ListElement[];
  public $listElementsDone: ListElement[];
  public $createFormElement: ListElement;

  public $form: FormGroup;
  public $buttonState: boolean;

  // add dynamic css class:
  // -> [class.cssState1]="listElementService.cssState == 1"
  public cssState = 1;

  constructor() {
    /**
     * This Constructor:
     * ->initializes Default Data for listElements[]/done
     * ->Creates the FormGroup and Controllers for from-dialog.html
     * ->Creates a undefined ListElement to push onto $listElements[]
     *   when submitting a Form
     */

    //Fills the $ListElements/Done with default data
    this.initializeLists();

    /**
     * The FormGroup and Controls for form-dialog.component.html
     * -> assigned to html as <form [formGroup]="listElementService.$form" ...
     */
    this.$form = new FormGroup({
      $key: new FormControl(null),
      $label: new FormControl("", Validators.required),
      $startDate: new FormControl("", Validators.required),
      $endDate: new FormControl(""),
      $startTime: new FormControl("", Validators.pattern('[0-9][0-9]:[0-9][0-9]')),
      $endTime: new FormControl("", Validators.pattern('[0-9][0-9]:[0-9][0-9]')),
      $deleteOnDone: new FormControl("1", Validators.required)
    });

    /**
     * Create a default Form Element
     * -> pushed to $listElements[] when submitting a form
     */
    this.resetFormElement();
  }

  public setCssState(state: number) {
    this.cssState = state;
  }
  public newFormGroup() {
    /**
     * When the dialog-form.html calls submitForm() or exitForm()
     * the input values get deleted after closing the dialog.
     */
    console.log("Cleanup dialog-form");
    this.$form.setValue({
      $key: null,
      $label: "",
      $startDate: "",
      $endDate: "",
      $startTime: "",
      $endTime: "",
      $deleteOnDone: "1",
    });
  }
  public submitForm() {
    /**
     * This gets called in form-dialog.component.hmtl on Submit
     * It fills the $createFormElements undefined values with
     * the input given by the dialog-form.html
     * -> then it calls createElement, wich pushes the Element to $listElements[]
     */
    console.log("submit Form: deleteonDone:");
    console.log(this.$form.value.$deleteonDone);

    this.resetFormElement(); // create a new empty object

    // pass values to formElment:
    this.$createFormElement.label = this.$form.value.$label;
    this.$createFormElement.startdate = this.$form.value.$startDate;
    this.$createFormElement.enddate = this.$form.value.$endDate;
    this.$createFormElement.startTime = this.$form.value.$startTime;
    this.$createFormElement.endTime = this.$form.value.$endTime;
    this.$createFormElement.deleteonDone = this.$buttonState;

    this.createElement(this.$createFormElement);
  }
  public toggleFormButton($event) {
    /**
     * This event gets fired in form-dialog,
     * it passes the current toggled value of the button and changes
     * the boolean buttonstate.
     * ButtonState is used when SubmitForm() is called.
     */
    console.log($event.value);
    if ($event.value === "1") {
      this.$buttonState = false;
    } else {
      this.$buttonState = true;
    }
    console.log("buttonstate:" + this.$buttonState);
  }
  public passedDialogInput($input: string): void {
    /**
     * When the schedule.list-form name is entered in input,
     * this function gets called and sets the default value
     * of the dialog form to $input
     * ->Create the new FormControl Element, with default as $input
     * ->change the FormController of FormGroup to this input FormController
     */

    this.$form.setControl('$label', new FormControl($input, [
      Validators.required,
      Validators.minLength(3)
    ]));
  }
  public resetFormElement(): void {
    /**
     * creates a Default SubmitFormElement:
     * SubmitForm() Fills this Element with the submitted values
     * of the form-dialog.component.html
     *
     * This object gets passed (in SubmitForm())
     * -> to createElement($createFormElement)
     * Wich pushed this Element to the $listElements[]
     */
    this.$createFormElement = new ListElement(
      undefined,
      undefined,
      false,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      false,
    );

  }
  public initializeLists(): void {
    /**
     * This function gets called in the constructor and creates the
     * Arrays of ListElements[].
     * --> Change these Arrays to change the default Elements
     * inside of the schedule list
     */
    this.$listElements = [
      {
        id: 2,
        label: "Break",
        status: false,
        position: 2,
        startdate: "11/10/2015",
        enddate: "11/10/2015",
        startTime: "12:30",
        endTime: "12:40",
        deleteonDone: false,
      },
      {
        id: 1,
        label: "Break End",
        status: false,
        position: 1,
        startdate: "11/10/2015",
        enddate: "11/10/2015",
        startTime: undefined,
        endTime: "13:30",
        deleteonDone: false,
      }
    ];
    this.$listElementsDone = [];
  }
  public getListElements(): ListElement[] {
    /**
     * This Function allows Schedule-list.comp to get
     * the listElements Array from this Service
     */
    console.log("service-getListElements()");
    return this.$listElements;
  }

  public getListElementsdone(): ListElement[] {
    /**
     * This Function allows Schedule-list.comp to get
     * the listElementsDone Array from this Service
     * -> called in the constructor
     */
    console.log("service-getListELementsDone()");
    return this.$listElementsDone;
  }

  public createElement(object: ListElement): void {
    /**
     * Call order:
     * -> form-dialog.component.html -> this.submitForm() -> createElement
     */
    console.log("Service.createElement() : " + object.label);

    object.id = this.$listElements.length + 1; // should be unique: set by server
    object.position = this.$listElements.length + 1;

    this.$listElements.push(object);
    this.assign('position');
  }

  public toListElements(object: ListElement): void {
    /**
     * This Function takes a ListElement an pushes it into the
     * listElements[] Array.
     * It also removes the object from the
     * listElementsDone[] Array
     *
     * listElements[] holds each active item, where listElement.status == false
     *
     * -> Called in Toggle Check schedule-list.component:
     */
    console.log("service-toListElements()");
    this.$listElements.push(object);
    this.$listElementsDone.splice(this.$listElementsDone.indexOf(object), 1);
  }

  public toListElementsDone(object: ListElement): void {
    /**
     * This Function takes a ListElement an pushes it into the
     * listElementsDone[] Array.
     * It also removes the object from the
     * listElements[] Array
     *
     * listElementsDOne[] holds each inactive item, where listElement.status == true
     *
     * -> Called in Toggle Check schedule-list.component:
     */
    console.log("service-toListElementsDone()");

    // Delete the object if deleteonDone is set to true:
    if (object.deleteonDone === true) {
      console.log("L-E.service -> deleteonDone");
      this.deleteFromElements(object);
    } else {
      this.$listElementsDone.push(object);
      this.deleteFromElements(object);
    };

  }

  public deleteFromElements(object: ListElement): void {
    /**
     * This Function gets Called fx:
     * -> in schedule-list-element.component -> deleteElement()
     *
     * only if obj.status= false
     */
    console.log("service-deleteFromElements()");
    this.$listElements.splice(this.$listElements.indexOf(object), 1);
    this.assign('id');
  }
  public deleteFromElementsDone(object: ListElement): void {
    /**
     * This Function gets Called fx:
     * -> in schedule-list-element.component -> deleteElement()
     *
     * only if obj.status= true
     */
    console.log("service-deleteFromElementsDone()");
    this.$listElementsDone.splice(this.$listElementsDone.indexOf(object), 1);
  }

  public assign($mode: string): void {
    /**
     * Assigns a new Position/id for each Element in $listElements,
     */
    console.log("service-assign: mode= " + $mode);
    let counter = 0;
    this.$listElements.forEach((element: ListElement) => {
      counter += 1;
      if ($mode === 'position') {
        element.position = counter;
      } else if ($mode === 'id') {
        element.id = counter;
      }
    });

    let counter2 = 0;
    this.$listElementsDone.forEach((element: ListElement) => {
      counter2 += 1;
      if ($mode === 'position') {
        element.position = counter2;
      } else if ($mode === 'id') {
        element.id = counter2;
      }
    });
  }


  public orderListElementsPosition(): void {
    /**
     * -> gets called in schedule-list.comp when dropping a ListElement
     * -> called in Dragula 'drop'
     */
    console.log("service-orderListElements by Position:");
    this.$listElements.sort((obj1, obj2) => {
      return obj1.position - obj2.position;
    });
  }
}
