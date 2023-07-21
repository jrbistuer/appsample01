import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BarcodeScanResult, BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private utils: UtilsService) {}

    isSupported = true;

  ngOnInit() {
    this.isSupported =  Capacitor.isPluginAvailable('barcode-scanner');
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.presentAlert(barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  async presentAlert(barcodeData: BarcodeScanResult): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Barcode',
      message: barcodeData.text,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
