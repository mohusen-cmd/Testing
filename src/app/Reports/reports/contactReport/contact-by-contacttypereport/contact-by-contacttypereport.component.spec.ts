import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactByContacttypereportComponent } from './contact-by-contacttypereport.component';

describe('ContactByContacttypereportComponent', () => {
  let component: ContactByContacttypereportComponent;
  let fixture: ComponentFixture<ContactByContacttypereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactByContacttypereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactByContacttypereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
