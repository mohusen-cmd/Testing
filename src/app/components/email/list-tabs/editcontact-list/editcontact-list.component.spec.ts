import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcontactListComponent } from './editcontact-list.component';

describe('EditcontactListComponent', () => {
  let component: EditcontactListComponent;
  let fixture: ComponentFixture<EditcontactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcontactListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcontactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
