import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsTabComponent } from './attachments-tab.component';

describe('AttachmentsTabComponent', () => {
  let component: AttachmentsTabComponent;
  let fixture: ComponentFixture<AttachmentsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
