import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadImportHistoryComponent } from './lead-import-history.component';

describe('LeadImportHistoryComponent', () => {
  let component: LeadImportHistoryComponent;
  let fixture: ComponentFixture<LeadImportHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadImportHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadImportHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
