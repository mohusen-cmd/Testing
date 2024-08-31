import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnewListsComponent } from './editnew-lists.component';

describe('EditnewListsComponent', () => {
  let component: EditnewListsComponent;
  let fixture: ComponentFixture<EditnewListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditnewListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnewListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
