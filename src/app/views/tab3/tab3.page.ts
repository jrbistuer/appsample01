import { Component, OnInit, ViewChild } from '@angular/core';
import { ILatLng } from 'src/app/models/interfaces';
import {Geolocation} from '@capacitor/geolocation';
import { MapsService } from 'src/app/services/maps.service';

declare var google: any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  title = '';
  stateObject = {
      submitted: false,
      hasErrors: true,
      error: '',
      loading: false
  };
  location!: ILatLng;
  address = '';
  directionsService = new google.maps.DirectionsService();
  map!: google.maps.Map;
  directionsDisplay: any;

  constructor(private mapsService: MapsService) {
  }

  ngOnInit() {
  }

  getCoordinatesByAddress() {
    try {
        this.mapsService.getCoordinatesByAddress(this.address).subscribe((res: any) => {
            if (res.results[0]) {
                this.location = res.results[0].geometry.location;
                this.initMap();
            }
        });
      } catch(err) {
        console.log(err);
      }
  }


    async ionViewDidEnter() {
        this.initPage();
    }

    async initPage() {
        this.location = await this.getCurrentPosition();
        this.initMap();
    }

  async initMap() {
      this.map = new google.maps.Map(document.getElementById('divMap'),
          {
              zoom: 15,
              center: this.location
          }
      );

      const marker = new google.maps.Marker({
          position: this.location,
          map: this. map,
          animation: google.maps.Animation.DROP
      });

      const service = new google.maps.places.PlacesService(this.map);

  }

  createMarker(place: any) {
      if (!place.geometry || !place.geometry.location) return;

      const marker = new google.maps.Marker({
          map: this.map,
          position: place.geometry.location,
      });
  }

  async getCurrentPosition(): Promise<ILatLng> {
      const coordinates = await Geolocation.getCurrentPosition();
      return {lat: coordinates.coords.latitude, lng: coordinates.coords.longitude};
  }

}
