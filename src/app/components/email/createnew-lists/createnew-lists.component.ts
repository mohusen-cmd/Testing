
import { Component, Input, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounce } from 'rxjs/operators';
@Component({
  selector: 'app-createnew-lists',
  templateUrl: './createnew-lists.component.html',
  styleUrls: ['./createnew-lists.component.scss']
})
export class CreatenewListsComponent implements OnInit {
   Id:any
  constructor(private activeRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params) => {
      this.Id = params.get("ListID");
    })

  }
}





