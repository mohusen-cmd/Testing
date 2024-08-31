import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydetailreportComponent } from './companydetailreport.component';

describe('CompanydetailreportComponent', () => {
  let component: CompanydetailreportComponent;
  let fixture: ComponentFixture<CompanydetailreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanydetailreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanydetailreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
