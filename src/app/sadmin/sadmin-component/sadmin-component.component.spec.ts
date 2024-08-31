import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminComponentComponent } from './sadmin-component.component';

describe('SadminComponentComponent', () => {
  let component: SadminComponentComponent;
  let fixture: ComponentFixture<SadminComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SadminComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function myfunction0() {
  var div = document.getElementById("bars");

  if (div.style.display === "none") {

      div.style.display = "block";
  }
  else {
      div.style.display = "none";
  }
}

function myfunction1() {
  var div = document.getElementById("drop");

  if (div.style.display === "none") {

      div.style.display = "block";
  }
  else {
      div.style.display = "none";
  }
}

function myfunction2() {
  var div = document.getElementById("a");
  var element = document.getElementById("arrowright");
  if (element.style.transform === "rotate(0deg)") {
      element.style.transform = "rotate(180deg)";
  } else {
      element.style.transform = "rotate(0deg)";
  }
  if (div.style.display == "none") {
    
      div.style.display = "block";
  }
  else {
      div.style.display = "none";
  }

}
