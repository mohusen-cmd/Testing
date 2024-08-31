import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOpperComponent } from './list-opper.component';

describe('ListOpperComponent', () => {
  let component: ListOpperComponent;
  let fixture: ComponentFixture<ListOpperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOpperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOpperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
