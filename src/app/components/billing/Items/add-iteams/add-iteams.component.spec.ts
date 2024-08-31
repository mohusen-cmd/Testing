import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIteamsComponent } from './add-iteams.component';

describe('AddIteamsComponent', () => {
  let component: AddIteamsComponent;
  let fixture: ComponentFixture<AddIteamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIteamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIteamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
