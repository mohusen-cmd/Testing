import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateoreditstatusComponent } from './createoreditstatus.component';

describe('CreateoreditstatusComponent', () => {
  let component: CreateoreditstatusComponent;
  let fixture: ComponentFixture<CreateoreditstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateoreditstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateoreditstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
