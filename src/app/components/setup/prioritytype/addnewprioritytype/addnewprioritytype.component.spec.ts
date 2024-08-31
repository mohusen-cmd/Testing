import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewprioritytypeComponent } from './addnewprioritytype.component';

describe('AddnewprioritytypeComponent', () => {
  let component: AddnewprioritytypeComponent;
  let fixture: ComponentFixture<AddnewprioritytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewprioritytypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewprioritytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
