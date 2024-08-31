import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicemailingTemplateComponent } from './invoicemailing-template.component';

describe('InvoicemailingTemplateComponent', () => {
  let component: InvoicemailingTemplateComponent;
  let fixture: ComponentFixture<InvoicemailingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicemailingTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicemailingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
