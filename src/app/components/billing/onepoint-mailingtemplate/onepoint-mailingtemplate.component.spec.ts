import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnepointMailingtemplateComponent } from './onepoint-mailingtemplate.component';

describe('OnepointMailingtemplateComponent', () => {
  let component: OnepointMailingtemplateComponent;
  let fixture: ComponentFixture<OnepointMailingtemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnepointMailingtemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnepointMailingtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
