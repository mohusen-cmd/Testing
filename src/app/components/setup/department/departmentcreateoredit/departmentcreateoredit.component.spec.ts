import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentcreateoreditComponent } from './departmentcreateoredit.component';

describe('DepartmentcreateoreditComponent', () => {
  let component: DepartmentcreateoreditComponent;
  let fixture: ComponentFixture<DepartmentcreateoreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentcreateoreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentcreateoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
