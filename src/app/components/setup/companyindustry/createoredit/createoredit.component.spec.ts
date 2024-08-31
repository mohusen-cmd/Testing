import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateoreditComponent } from './createoredit.component';

describe('CreateoreditComponent', () => {
  let component: CreateoreditComponent;
  let fixture: ComponentFixture<CreateoreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateoreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
