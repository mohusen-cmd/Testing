import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaddetailreportsComponent } from './leaddetailreports.component';

describe('LeaddetailreportsComponent', () => {
  let component: LeaddetailreportsComponent;
  let fixture: ComponentFixture<LeaddetailreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaddetailreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaddetailreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
