import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsourceandstatusreportComponent } from './leadsourceandstatusreport.component';

describe('LeadsourceandstatusreportComponent', () => {
  let component: LeadsourceandstatusreportComponent;
  let fixture: ComponentFixture<LeadsourceandstatusreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadsourceandstatusreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsourceandstatusreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
