import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateoreditclientComponent } from './createoreditclient.component';

describe('CreateoreditclientComponent', () => {
  let component: CreateoreditclientComponent;
  let fixture: ComponentFixture<CreateoreditclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateoreditclientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateoreditclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
