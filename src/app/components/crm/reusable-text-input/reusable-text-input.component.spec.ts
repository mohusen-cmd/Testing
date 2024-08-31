import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTextInputComponent } from './reusable-text-input.component';

describe('ReusableTextInputComponent', () => {
  let component: ReusableTextInputComponent;
  let fixture: ComponentFixture<ReusableTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableTextInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
