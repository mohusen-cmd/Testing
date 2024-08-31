import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactByLeadsourcereportComponent } from './contact-by-leadsourcereport.component';

describe('ContactByLeadsourcereportComponent', () => {
  let component: ContactByLeadsourcereportComponent;
  let fixture: ComponentFixture<ContactByLeadsourcereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactByLeadsourcereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactByLeadsourcereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
