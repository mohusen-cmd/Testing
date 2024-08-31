import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtriggeredpopupComponent } from './viewtriggeredpopup.component';

describe('ViewtriggeredpopupComponent', () => {
  let component: ViewtriggeredpopupComponent;
  let fixture: ComponentFixture<ViewtriggeredpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtriggeredpopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtriggeredpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
