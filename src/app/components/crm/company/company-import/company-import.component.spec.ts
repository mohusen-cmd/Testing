import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyImportComponent } from './company-import.component';

describe('CompanyImportComponent', () => {
  let component: CompanyImportComponent;
  let fixture: ComponentFixture<CompanyImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
