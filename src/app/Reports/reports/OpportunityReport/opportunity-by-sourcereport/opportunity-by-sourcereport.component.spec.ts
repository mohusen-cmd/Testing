import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityBySourcereportComponent } from './opportunity-by-sourcereport.component';

describe('OpportunityBySourcereportComponent', () => {
  let component: OpportunityBySourcereportComponent;
  let fixture: ComponentFixture<OpportunityBySourcereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityBySourcereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityBySourcereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
