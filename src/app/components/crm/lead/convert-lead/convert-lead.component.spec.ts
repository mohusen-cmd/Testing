import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertLeadComponent } from './convert-lead.component';

describe('ConvertLeadComponent', () => {
  let component: ConvertLeadComponent;
  let fixture: ComponentFixture<ConvertLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
