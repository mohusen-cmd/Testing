import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesavepopupComponent } from './createsavepopup.component';

describe('CreatesavepopupComponent', () => {
  let component: CreatesavepopupComponent;
  let fixture: ComponentFixture<CreatesavepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatesavepopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesavepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
