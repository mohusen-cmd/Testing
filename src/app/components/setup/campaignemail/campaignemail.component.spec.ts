import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignemailComponent } from './campaignemail.component';

describe('CampaignemailComponent', () => {
  let component: CampaignemailComponent;
  let fixture: ComponentFixture<CampaignemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
