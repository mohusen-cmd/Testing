import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDashBoardComponent } from './email-dash-board.component';

describe('EmailDashBoardComponent', () => {
  let component: EmailDashBoardComponent;
  let fixture: ComponentFixture<EmailDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailDashBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
