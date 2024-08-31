import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyindustryComponent } from './companyindustry.component';

describe('CompanyindustryComponent', () => {
  let component: CompanyindustryComponent;
  let fixture: ComponentFixture<CompanyindustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyindustryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyindustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
