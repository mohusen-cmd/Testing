import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritytypeComponent } from './prioritytype.component';

describe('PrioritytypeComponent', () => {
  let component: PrioritytypeComponent;
  let fixture: ComponentFixture<PrioritytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrioritytypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
