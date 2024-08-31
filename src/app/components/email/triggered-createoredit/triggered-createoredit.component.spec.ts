import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggeredCreateoreditComponent } from './triggered-createoredit.component';

describe('TriggeredCreateoreditComponent', () => {
  let component: TriggeredCreateoreditComponent;
  let fixture: ComponentFixture<TriggeredCreateoreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriggeredCreateoreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggeredCreateoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
