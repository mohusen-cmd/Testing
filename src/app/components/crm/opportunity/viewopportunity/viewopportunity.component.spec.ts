import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewopportunityComponent } from './viewopportunity.component';

describe('ViewopportunityComponent', () => {
  let component: ViewopportunityComponent;
  let fixture: ComponentFixture<ViewopportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewopportunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewopportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
