import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipcreateoreditComponent } from './ownershipcreateoredit.component';

describe('OwnershipcreateoreditComponent', () => {
  let component: OwnershipcreateoreditComponent;
  let fixture: ComponentFixture<OwnershipcreateoreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnershipcreateoreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnershipcreateoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
