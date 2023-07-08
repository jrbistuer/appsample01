import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  showElementByPlatform(plugin: string) {
    // console.log(Capacitor.getPlatform());
    // console.log(Capacitor.isPluginAvailable(plugin));
    // console.log(Capacitor.isNativePlatform());
    return Capacitor.isNativePlatform();
  }

}
