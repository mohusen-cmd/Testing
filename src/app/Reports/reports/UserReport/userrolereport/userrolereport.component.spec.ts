import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrolereportComponent } from './userrolereport.component';

describe('UserrolereportComponent', () => {
  let component: UserrolereportComponent;
  let fixture: ComponentFixture<UserrolereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserrolereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrolereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
