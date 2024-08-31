import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityByStatusreportComponent } from './activity-by-statusreport.component';

describe('ActivityByStatusreportComponent', () => {
  let component: ActivityByStatusreportComponent;
  let fixture: ComponentFixture<ActivityByStatusreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityByStatusreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityByStatusreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
