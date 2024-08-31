import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingFilesComponent } from './pending-files.component';

describe('PendingFilesComponent', () => {
  let component: PendingFilesComponent;
  let fixture: ComponentFixture<PendingFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
