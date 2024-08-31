import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyownershiptypeComponent } from './companyownershiptype.component';

describe('CompanyownershiptypeComponent', () => {
  let component: CompanyownershiptypeComponent;
  let fixture: ComponentFixture<CompanyownershiptypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyownershiptypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyownershiptypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
