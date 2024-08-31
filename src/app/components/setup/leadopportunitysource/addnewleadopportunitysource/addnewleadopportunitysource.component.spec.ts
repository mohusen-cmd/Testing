import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewleadopportunitysourceComponent } from './addnewleadopportunitysource.component';

describe('AddnewleadopportunitysourceComponent', () => {
  let component: AddnewleadopportunitysourceComponent;
  let fixture: ComponentFixture<AddnewleadopportunitysourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewleadopportunitysourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewleadopportunitysourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
