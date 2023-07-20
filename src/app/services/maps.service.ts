import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILatLng } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private httpClient: HttpClient) { }

  getCoordinatesByAddress(address: string) {
    return this.httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyClsQLDBIwhn0y0Cm9ASMrJjsUwtDA0Yl4`);
  }

}
