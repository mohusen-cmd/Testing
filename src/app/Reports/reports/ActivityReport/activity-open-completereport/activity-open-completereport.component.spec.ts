import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityOpenCompletereportComponent } from './activity-open-completereport.component';

describe('ActivityOpenCompletereportComponent', () => {
  let component: ActivityOpenCompletereportComponent;
  let fixture: ComponentFixture<ActivityOpenCompletereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityOpenCompletereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityOpenCompletereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
