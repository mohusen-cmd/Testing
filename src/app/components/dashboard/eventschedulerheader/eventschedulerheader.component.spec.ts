import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventschedulerheaderComponent } from './eventschedulerheader.component';

describe('EventschedulerheaderComponent', () => {
  let component: EventschedulerheaderComponent;
  let fixture: ComponentFixture<EventschedulerheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventschedulerheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventschedulerheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
