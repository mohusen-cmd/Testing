import { AgmMap } from '@agm/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare var google: any;

class Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  address_city?: string;
  marker?: Marker;
}
@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  @Output() status = new EventEmitter();
  selectOperatorName = 'Lessthan'
  AccountObj: any = {}
  geocoder: any;
  public location: Location = {
    lat: 41.850033,
    lng: -87.6500523,
    zoom: 5
  };
  postal
  oper
  jtPageIndex
  jtPageSize
  radious
  RecordCount
  MapResult: any = [];
  marker: any = {};
  markers: Marker[] = []
  @ViewChild(AgmMap) map: AgmMap
  displayedColumns: string[] = ['leadname', 'leadsource', 'leadowner', 'leadstatus', 'Lat', 'Lng'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild('content', { static: true }) modal: any
  constructor(public service: AuthenticationService, private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.BindRadius();
    this.openLg(this.modal)
  }

  OnAdsearchredius() {
    let postal = this.AccountObj.ZipCode != undefined ? this.AccountObj.ZipCode : "10";
    let oper = this.selectOperatorName != undefined ? this.selectOperatorName : 'Lessthan';
    let radious = this.AccountObj.Radius != undefined ? this.AccountObj.Radius : 50;
    this.service.getlatlangs(postal, oper, radious).subscribe((response) => {
      debugger
      this.MapResult = response
      this.MapResult.forEach(item => {
        this.marker.lat = item.Lat,
          this.marker.lng = item.Long,
          this.marker.label = `${item.City1} latitude is: ${item.Lat} longitude is:${item.Long}`,
          this.marker.draggable = true;
        this.markers.push(this.marker);
        this.marker = {};
      })
      this.map.triggerResize();
    })
  }

  clear() {
    this.AccountObj.Radius = ''
    this.AccountObj.ZipCode = ''
  }

  BindRadius() {
    let postal = this.AccountObj.ZipCode != undefined ? this.AccountObj.ZipCode : "10";
    let oper = this.selectOperatorName != undefined ? this.selectOperatorName : 'Lessthan';
    let jtPageIndex = 0;
    let jtPageSize = 10
    let radious = this.AccountObj.Radius != undefined ? this.AccountObj.Radius : 50;
    let RecordCount = 0
    this.service.getContactRadius(postal, oper, jtPageIndex, jtPageSize, radious, RecordCount).subscribe((response) => {
    })
  }
  openLg(content) {
    this.modalService.open(content,  { size: 'xl',backdrop:'static',keyboard:false});
  }
  close(){
    this.modalService.dismissAll()
    this.status.emit(false)
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
