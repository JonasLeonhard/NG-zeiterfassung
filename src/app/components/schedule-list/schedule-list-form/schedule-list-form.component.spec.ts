import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleListFormComponent } from './schedule-list-form.component';

describe('ScheduleListFormComponent', () => {
  let component: ScheduleListFormComponent;
  let fixture: ComponentFixture<ScheduleListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
