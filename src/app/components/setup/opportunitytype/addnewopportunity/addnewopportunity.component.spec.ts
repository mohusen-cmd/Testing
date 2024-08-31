import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewopportunityComponent } from './addnewopportunity.component';

describe('AddnewopportunityComponent', () => {
  let component: AddnewopportunityComponent;
  let fixture: ComponentFixture<AddnewopportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewopportunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewopportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
