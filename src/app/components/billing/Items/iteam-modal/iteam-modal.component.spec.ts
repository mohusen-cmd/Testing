import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IteamModalComponent } from './iteam-modal.component';

describe('IteamModalComponent', () => {
  let component: IteamModalComponent;
  let fixture: ComponentFixture<IteamModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IteamModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IteamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
