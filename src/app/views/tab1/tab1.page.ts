import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  lorem: string = '';
  param = {user: 'Ramon'};

  constructor(
    private auth: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ionViewWillEnter() {
    // this.lorem = this.translateService.instant("GENERAL.UTILS.loremipsum");

    this.translateService.get("GENERAL.UTILS.loremipsum").subscribe((txt) => {
      this.lorem = txt;
    });
  }

  logout() {
    console.log('logging out');
    this.auth.logout().then(() => {
      this.router.navigate(['login']);
    });
  }

  async showHelloToast() {
    await Toast.show({
      text: 'Hello!',
    });
  };

}
