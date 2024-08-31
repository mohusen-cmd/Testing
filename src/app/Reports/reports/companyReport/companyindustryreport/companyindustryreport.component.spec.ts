import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyindustryreportComponent } from './companyindustryreport.component';

describe('CompanyindustryreportComponent', () => {
  let component: CompanyindustryreportComponent;
  let fixture: ComponentFixture<CompanyindustryreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyindustryreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyindustryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
