import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTypereportComponent } from './company-typereport.component';

describe('CompanyTypereportComponent', () => {
  let component: CompanyTypereportComponent;
  let fixture: ComponentFixture<CompanyTypereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyTypereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTypereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
