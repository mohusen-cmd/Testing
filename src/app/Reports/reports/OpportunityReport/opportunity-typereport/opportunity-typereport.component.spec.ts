import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityTypereportComponent } from './opportunity-typereport.component';

describe('OpportunityTypereportComponent', () => {
  let component: OpportunityTypereportComponent;
  let fixture: ComponentFixture<OpportunityTypereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityTypereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityTypereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
