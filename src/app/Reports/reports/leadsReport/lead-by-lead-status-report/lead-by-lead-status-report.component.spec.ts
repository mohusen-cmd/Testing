import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadByLeadStatusReportComponent } from './lead-by-lead-status-report.component';

describe('LeadByLeadStatusReportComponent', () => {
  let component: LeadByLeadStatusReportComponent;
  let fixture: ComponentFixture<LeadByLeadStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadByLeadStatusReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadByLeadStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
