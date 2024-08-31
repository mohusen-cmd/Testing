import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewbuyingleadsComponent } from './addnewbuyingleads.component';

describe('AddnewbuyingleadsComponent', () => {
  let component: AddnewbuyingleadsComponent;
  let fixture: ComponentFixture<AddnewbuyingleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewbuyingleadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewbuyingleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
