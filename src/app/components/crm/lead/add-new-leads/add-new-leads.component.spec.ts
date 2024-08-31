import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLeadsComponent } from './add-new-leads.component';

describe('AddNewLeadsComponent', () => {
  let component: AddNewLeadsComponent;
  let fixture: ComponentFixture<AddNewLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
