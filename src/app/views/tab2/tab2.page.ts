import { Component, OnInit } from '@angular/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { PhotoService } from 'src/app/services/photo.service';
import { ActionSheetController } from '@ionic/angular';
import { IUser, IUserPhoto } from 'src/app/models/interfaces';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { updatePassword } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  user!: IUser;
	canviPwdForm!: FormGroup;
	isModalOpen = false;

  constructor(public photoService: PhotoService,
		private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
    public userService: UserService,
    private authService: AuthService,
    private utilsService: UtilsService) {}

  get pwd() {
    return this.canviPwdForm.get('pwd');
  }

  get repeteixPwd() {
    return this.canviPwdForm.get('repeteixPwd');
  }

  ionViewWillEnter() {
    this.init();
  }

  init() {
    this.userService.getUser().then((user: IUser) => {
      this.user = user;
      console.log(this.user);
    });
    this.setForm();
  }

  setForm() {
    this.canviPwdForm = this.fb.group({
			pwd: ['', [Validators.required, Validators.minLength(6)]],
			repeteixPwd: ['', [Validators.required, this.validaRepPwd()]]
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

	setOpen(isOpen: boolean) {
		this.isModalOpen = isOpen;
	}

  canviarPwd() {
    if (this.canviPwdForm.valid) {
      updatePassword(this.authService.getUser()!, this.canviPwdForm.controls['pwd'].value).then(() => {
				const endFunction = () => {
					this.isModalOpen = false;
					return false;
				};
				this.utilsService.showAlert('', 'Password canviada!', endFunction);	
      }).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				this.utilsService.showAlert(errorCode, errorMessage);	
      });
    }
  }

  private validaRepPwd(): ValidatorFn {
    return (control: AbstractControl) => {
      const ok = this.canviPwdForm ? this.canviPwdForm.get('pwd')!.value === control.value : false;
      return ok ? null : {pwdError: {value: control.value}};
    };
  }

}
