import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityByPriorityreportComponent } from './activity-by-priorityreport.component';

describe('ActivityByPriorityreportComponent', () => {
  let component: ActivityByPriorityreportComponent;
  let fixture: ComponentFixture<ActivityByPriorityreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityByPriorityreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityByPriorityreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
