import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateoreditusersComponent } from './createoreditusers.component';

describe('CreateoreditusersComponent', () => {
  let component: CreateoreditusersComponent;
  let fixture: ComponentFixture<CreateoreditusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateoreditusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateoreditusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
