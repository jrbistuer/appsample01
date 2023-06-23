import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { IVacanca } from 'src/app/models/interfaces';
import { VacancesService } from 'src/app/services/vacances.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id!: string;
  vacanca!: IVacanca;

  constructor(
    private vacancesService: VacancesService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.vacancesService.getVacancaById(this.id).subscribe(res => {
      this.vacanca = res;
    });
  }

  async deleteVacanca() {
    await this.vacancesService.deleteVacanca(this.vacanca)
    this.modalCtrl.dismiss();
  }

  async updateVacanca() {
    await this.vacancesService.updateVacanca(this.vacanca);
    const toast = await this.toastCtrl.create({
      message: 'Vacanca updated!.',
      duration: 2000
    });
    toast.present();

  }
}