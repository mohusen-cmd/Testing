import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcampaignemailComponent } from './addnewcampaignemail.component';

describe('AddnewcampaignemailComponent', () => {
  let component: AddnewcampaignemailComponent;
  let fixture: ComponentFixture<AddnewcampaignemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewcampaignemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewcampaignemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
