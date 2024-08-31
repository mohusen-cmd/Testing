import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminlayoutComponentComponent } from './super-adminlayout-component.component';

describe('SuperAdminlayoutComponentComponent', () => {
  let component: SuperAdminlayoutComponentComponent;
  let fixture: ComponentFixture<SuperAdminlayoutComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminlayoutComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminlayoutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
