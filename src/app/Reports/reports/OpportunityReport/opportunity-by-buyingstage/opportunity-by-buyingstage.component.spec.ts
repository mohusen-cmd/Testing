import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityByBuyingstageComponent } from './opportunity-by-buyingstage.component';

describe('OpportunityByBuyingstageComponent', () => {
  let component: OpportunityByBuyingstageComponent;
  let fixture: ComponentFixture<OpportunityByBuyingstageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityByBuyingstageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityByBuyingstageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
