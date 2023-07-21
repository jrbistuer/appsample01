import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IVacanca } from 'src/app/models/interfaces';
import { VacancesService } from 'src/app/services/vacances.service';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  vacances: IVacanca[] = [];

  constructor(
    private vacancesService: VacancesService,
    private cd: ChangeDetectorRef,
    private modalCtrl: ModalController,
    private router: Router,
    private authService: AuthService,
    private shareService: ShareService) {
  }

  ionViewWillEnter() {
    this.vacancesService.getVacancesByUser(this.authService.getUserId()).then(res => {
      this.vacances = res;
      this.cd.detectChanges();
    });
  }

  async addVacanca() {
    this.router.navigate(['new-vacanca']);
  }
    
  async openVacanca(Vacanca: IVacanca) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: Vacanca.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }

  async shareVacanca(vacanca: IVacanca) {
    const res = await this.shareService.shareVacanca(vacanca);
    console.log(res);
  }

}