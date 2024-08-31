import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityreportComponent } from './opportunityreport.component';

describe('OpportunityreportComponent', () => {
  let component: OpportunityreportComponent;
  let fixture: ComponentFixture<OpportunityreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
