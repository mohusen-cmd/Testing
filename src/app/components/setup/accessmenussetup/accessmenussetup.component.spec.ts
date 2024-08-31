import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessmenussetupComponent } from './accessmenussetup.component';

describe('AccessmenussetupComponent', () => {
  let component: AccessmenussetupComponent;
  let fixture: ComponentFixture<AccessmenussetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessmenussetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessmenussetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
