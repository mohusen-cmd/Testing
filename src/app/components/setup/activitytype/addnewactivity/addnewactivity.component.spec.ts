import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewactivityComponent } from './addnewactivity.component';

describe('AddnewactivityComponent', () => {
  let component: AddnewactivityComponent;
  let fixture: ComponentFixture<AddnewactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewactivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
