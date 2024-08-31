import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityModalComponent } from './opportunity-modal.component';

describe('OpportunityModalComponent', () => {
  let component: OpportunityModalComponent;
  let fixture: ComponentFixture<OpportunityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
