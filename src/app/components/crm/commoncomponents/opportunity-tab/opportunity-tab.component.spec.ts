import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityTabComponent } from './opportunity-tab.component';

describe('OpportunityTabComponent', () => {
  let component: OpportunityTabComponent;
  let fixture: ComponentFixture<OpportunityTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
