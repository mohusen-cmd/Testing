import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPaymentComponent } from './quick-payment.component';

describe('QuickPaymentComponent', () => {
  let component: QuickPaymentComponent;
  let fixture: ComponentFixture<QuickPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
