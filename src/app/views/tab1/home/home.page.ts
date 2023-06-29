import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IVacanca } from 'src/app/models/interfaces';
import { VacancesService } from 'src/app/services/vacances.service';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from 'src/app/services/auth.service';
import { VacancesHttpService } from 'src/app/services/vacances-http.service';
import { Vacanca } from 'src/app/models/vacanca';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  vacances: IVacanca[] = [];

  constructor(
    private vacancesService: VacancesHttpService,
    private cd: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private authService: AuthService) {
    this.vacancesService.getVacances().subscribe(res => {
      this.vacances = res;
      console.log(this.vacances);
      console.log(this.vacances[0]);
      const vaca: Vacanca = new Vacanca(this.vacances[0]);
      console.log(vaca);
      this.cd.detectChanges();
    });
  }

  async addVacanca() {
    const alert = await this.alertCtrl.create({
      header: 'Add Vacanca',
      inputs: [
        {
          name: 'title',
          placeholder: 'My cool Vacanca',
          type: 'text'
        },
        {
          name: 'text',
          placeholder: 'Learn Ionic',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.vacancesService.addVacanca({
              nom: 'Test',
              preu: 1000,
              pais: 'Turkey',
              descripcio: 'test',
              user: this.authService.getUserId()
            });
          }
        }
      ]
    });

    await alert.present();

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

}