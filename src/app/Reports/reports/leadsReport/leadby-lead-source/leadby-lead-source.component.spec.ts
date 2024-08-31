import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadbyLeadSourceComponent } from './leadby-lead-source.component';

describe('LeadbyLeadSourceComponent', () => {
  let component: LeadbyLeadSourceComponent;
  let fixture: ComponentFixture<LeadbyLeadSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadbyLeadSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadbyLeadSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
