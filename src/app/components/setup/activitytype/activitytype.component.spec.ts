import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitytypeComponent } from './activitytype.component';

describe('ActivitytypeComponent', () => {
  let component: ActivitytypeComponent;
  let fixture: ComponentFixture<ActivitytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitytypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
