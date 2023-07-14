import { Component, OnInit } from '@angular/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { PhotoService } from 'src/app/services/photo.service';
import { ActionSheetController } from '@ionic/angular';
import { IUser, IUserPhoto } from 'src/app/models/interfaces';
import { UserService } from 'src/app/services/user.service';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  user!: IUser;

  constructor(public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    public userService: UserService) {}

  ionViewWillEnter() {
    this.init();
  }

  init() {
    this.userService.getUser().then((user: IUser) => {
      this.user = user;
      console.log(this.user);
    });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery().then(() => {
      this.init();
    });
  }

  public async showActionSheet(photo: IUserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }

}
