import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModelreportComponent } from './activity-modelreport.component';

describe('ActivityModelreportComponent', () => {
  let component: ActivityModelreportComponent;
  let fixture: ComponentFixture<ActivityModelreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityModelreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityModelreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
