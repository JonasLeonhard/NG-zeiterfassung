import { Time } from '@angular/common';

export interface ListElement {
    id? : number;
    label? : string;
    status : boolean;

    //For Drag&Drop
    position? : number;

    startdate? : Date;
    enddate? : Date;
    startTime? : Time;
    endTime? : Time;
}
