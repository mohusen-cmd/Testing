import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityByTypereportComponent } from './activity-by-typereport.component';

describe('ActivityByTypereportComponent', () => {
  let component: ActivityByTypereportComponent;
  let fixture: ComponentFixture<ActivityByTypereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityByTypereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityByTypereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
