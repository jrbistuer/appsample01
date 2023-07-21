import { Injectable } from '@angular/core';
import { Camera } from '@capacitor/camera';
import { CanShareResult, Share, ShareResult } from '@capacitor/share';
import { IVacanca } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  async canShare(): Promise<CanShareResult> {
    return Share.canShare();
  }

  async shareVacanca(vacanca: IVacanca): Promise<ShareResult | null> {
    const cani = await this.canShare();
    if (cani) {
      return await Share.share({
        title: vacanca.pais,
        text: vacanca.descripcio,
        url: 'http://ionicframework.com/',
        dialogTitle: vacanca.nom,
      });
    } else {
      return null;
    }
  }

}
