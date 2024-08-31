import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactByOwnerreportComponent } from './contact-by-ownerreport.component';

describe('ContactByOwnerreportComponent', () => {
  let component: ContactByOwnerreportComponent;
  let fixture: ComponentFixture<ContactByOwnerreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactByOwnerreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactByOwnerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
