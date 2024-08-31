import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOwnerreportComponent } from './company-ownerreport.component';

describe('CompanyOwnerreportComponent', () => {
  let component: CompanyOwnerreportComponent;
  let fixture: ComponentFixture<CompanyOwnerreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyOwnerreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOwnerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
