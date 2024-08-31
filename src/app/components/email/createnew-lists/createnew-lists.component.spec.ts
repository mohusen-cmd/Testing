import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewListsComponent } from './createnew-lists.component';

describe('CreatenewListsComponent', () => {
  let component: CreatenewListsComponent;
  let fixture: ComponentFixture<CreatenewListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenewListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenewListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
