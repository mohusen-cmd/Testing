import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcustomComponent } from './addnewcustom.component';

describe('AddnewcustomComponent', () => {
  let component: AddnewcustomComponent;
  let fixture: ComponentFixture<AddnewcustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewcustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewcustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
