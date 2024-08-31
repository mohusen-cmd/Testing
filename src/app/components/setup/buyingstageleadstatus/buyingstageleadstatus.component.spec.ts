import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingstageleadstatusComponent } from './buyingstageleadstatus.component';

describe('BuyingstageleadstatusComponent', () => {
  let component: BuyingstageleadstatusComponent;
  let fixture: ComponentFixture<BuyingstageleadstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyingstageleadstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyingstageleadstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
