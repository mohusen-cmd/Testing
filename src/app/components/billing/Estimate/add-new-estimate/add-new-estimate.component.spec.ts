import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEstimateComponent } from './add-new-estimate.component';

describe('AddNewEstimateComponent', () => {
  let component: AddNewEstimateComponent;
  let fixture: ComponentFixture<AddNewEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewEstimateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
