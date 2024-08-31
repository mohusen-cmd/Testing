import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphasearchComponent } from './alphasearch.component';

describe('AlphasearchComponent', () => {
  let component: AlphasearchComponent;
  let fixture: ComponentFixture<AlphasearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlphasearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphasearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
