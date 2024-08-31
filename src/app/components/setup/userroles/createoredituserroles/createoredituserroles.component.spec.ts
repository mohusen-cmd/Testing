import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateoredituserrolesComponent } from './createoredituserroles.component';

describe('CreateoredituserrolesComponent', () => {
  let component: CreateoredituserrolesComponent;
  let fixture: ComponentFixture<CreateoredituserrolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateoredituserrolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateoredituserrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
