import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOwnershiptypereportComponent } from './company-ownershiptypereport.component';

describe('CompanyOwnershiptypereportComponent', () => {
  let component: CompanyOwnershiptypereportComponent;
  let fixture: ComponentFixture<CompanyOwnershiptypereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyOwnershiptypereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOwnershiptypereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
