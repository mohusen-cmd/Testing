import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditopperlistComponent } from './editopperlist.component';

describe('EditopperlistComponent', () => {
  let component: EditopperlistComponent;
  let fixture: ComponentFixture<EditopperlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditopperlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditopperlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
