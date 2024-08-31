import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactdetailreportComponent } from './contactdetailreport.component';

describe('ContactdetailreportComponent', () => {
  let component: ContactdetailreportComponent;
  let fixture: ComponentFixture<ContactdetailreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactdetailreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactdetailreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
