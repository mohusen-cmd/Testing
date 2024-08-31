import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-alphasearch',
  templateUrl: './alphasearch.component.html',
  styleUrls: ['./alphasearch.component.scss']
})
export class AlphasearchComponent implements OnInit {
  AlphaSearch:any=[];
  searchcolumn:string ;
  alphanumericsort:string;
  @Output() Searchstatus = new EventEmitter();
  SelectedCharecter:number;
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  constructor() { }

  ngOnInit() {
    this.SelectedCharecter=0;
    this.AlphaSearch.push("All");
    //this.AlphaSearch.push("#");
    this.AlphanumericSearch();
  }
  AlphanumericSearch() {
    
    for (var i = 0 ; i < 26 ; i++) {
        var letter = String.fromCharCode(65 + i);
        this.AlphaSearch.push(letter);
    }
     
  }

  AlphaSearchData(item,i){
    
    this.SelectedCharecter=i;
    this.Searchstatus.emit(item);

  }
}
