import { AgmMap, GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare var google: any;

interface Marker {
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
  selector: 'app-contact-map',
  templateUrl: './contact-map.component.html',
  styleUrls: ['./contact-map.component.scss']
})

export class ContactMapComponent implements OnInit {
  @Input() ContactId: any;
  geocoder: any;
  ListOfaddress; any;
  public location: Location = {
    lat: 17.415371,
    lng: 78.421432,
    zoom: 12
  };
  markers: Marker[] = [
    {
      lat: 17.415371,
      lng: 78.421432,
      label: 'Defult',
      draggable: true
    }
  ]
  @ViewChild(AgmMap) map: AgmMap;
  constructor(public mapsApiLoader: MapsAPILoader, private zone: NgZone, private wrapper: GoogleMapsAPIWrapper, public authservice: AuthenticationService) {
    this.mapsApiLoader = mapsApiLoader
    this.zone = zone
    this.wrapper = wrapper
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit(): void {
    this.authservice.getContactDetails(this.ContactId, 2).subscribe((res) => {
      

      this.ListOfaddress = res["AccountObj"];
      let Address = "";
      if (this.ListOfaddress.MailingAddress != '')
        Address = this.ListOfaddress.MailingAddress;
      if (this.ListOfaddress.MailingAddress2 != '')
        Address = Address + "," + this.ListOfaddress.MailingAddress2;
      if (this.ListOfaddress.Mailingcity != '')
        Address = Address + "," + this.ListOfaddress.Mailingcity;
      if (this.ListOfaddress.MailingstateID != '')
        var cutry = res["StateList"].filter(item => item.ID === this.ListOfaddress.MailingcountryID);
      let statename = cutry[0].StateName;
      Address = Address + "," + statename;
      Address = Address + "," + this.ListOfaddress.MailingstateID;
      if (this.ListOfaddress.Mailingzip != '')
        Address = Address + "," + this.ListOfaddress.Mailingzip;
      if (this.ListOfaddress.MailingcountryID != '')
        var cutry = res["CountryList"].filter(item => item.CountryId === this.ListOfaddress.MailingcountryID);
      let countryname = cutry[0].CountryName;
      Address = Address + "," + countryname;
      this.findLocation(Address);
    })

  }
  findLocation(address: string) {
    if (!this.geocoder) 
    this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types

          if (types.indexOf('locality') != -1) {
            this.location.address_level_2 = results[0].address_components[i].long_name
          }
          if (types.indexOf('country') != -1) {
            this.location.address_country = results[0].address_components[i].long_name
          }
          if (types.indexOf('postal_code') != -1) {
            this.location.address_zip = results[0].address_components[i].long_name
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.location.address_state = results[0].address_components[i].long_name
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.markers[0].lat = results[0].geometry.location.lat();
          this.markers[0].lng = results[0].geometry.location.lng();
          this.markers[0].label=address;
          this.markers[0].draggable = true;
          this.location.viewport = results[0].geometry.viewport;
        }        
        this.map.triggerResize()
      } else {
        alert("Sorry, this search produced no results.");
      }
    })
  }

}
