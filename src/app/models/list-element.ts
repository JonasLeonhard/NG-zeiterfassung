import { Time } from '@angular/common';

export class ListElement {
    constructor(
        public id: number,
        public label: string,
        public status: boolean,
        public position: number,
        public startdate: string,
        public enddate: string,
        public startTime: string,
        public endTime: string,
        public deleteonDone: boolean,
    ) {}
}
