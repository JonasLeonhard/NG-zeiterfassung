import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleListElementComponent } from './schedule-list-element.component';

describe('ScheduleListElementComponent', () => {
  let component: ScheduleListElementComponent;
  let fixture: ComponentFixture<ScheduleListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
