import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggeredCampainComponent } from './triggered-campain.component';

describe('TriggeredCampainComponent', () => {
  let component: TriggeredCampainComponent;
  let fixture: ComponentFixture<TriggeredCampainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriggeredCampainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggeredCampainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
