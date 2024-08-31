import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlistTabComponent } from './editlist-tab.component';

describe('EditlistTabComponent', () => {
  let component: EditlistTabComponent;
  let fixture: ComponentFixture<EditlistTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditlistTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlistTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
