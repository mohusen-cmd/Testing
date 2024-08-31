import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadopportunitysourceComponent } from './leadopportunitysource.component';

describe('LeadopportunitysourceComponent', () => {
  let component: LeadopportunitysourceComponent;
  let fixture: ComponentFixture<LeadopportunitysourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadopportunitysourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadopportunitysourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
