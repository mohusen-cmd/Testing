import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadownerreportComponent } from './leadownerreport.component';

describe('LeadownerreportComponent', () => {
  let component: LeadownerreportComponent;
  let fixture: ComponentFixture<LeadownerreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadownerreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadownerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
