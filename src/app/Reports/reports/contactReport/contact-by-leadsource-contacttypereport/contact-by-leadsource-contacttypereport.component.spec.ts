import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactByLeadsourceContacttypereportComponent } from './contact-by-leadsource-contacttypereport.component';

describe('ContactByLeadsourceContacttypereportComponent', () => {
  let component: ContactByLeadsourceContacttypereportComponent;
  let fixture: ComponentFixture<ContactByLeadsourceContacttypereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactByLeadsourceContacttypereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactByLeadsourceContacttypereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
