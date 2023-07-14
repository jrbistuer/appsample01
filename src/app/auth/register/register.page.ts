import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IUser } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	credentials!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private authService: AuthService,
    private userService: UserService,
		private router: Router
	) {}

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

	get nom() {
		return this.credentials.get('password');
	}

	get cognom() {
		return this.credentials.get('password');
	}

	ngOnInit() {
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			nom: ['', [Validators.required]],
			cognom: ['', [Validators.required]],
		});
	}

	async register() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.register(this.credentials.value);

		if (user) {

      const myUser: IUser = {
        id: this.authService.getUserId(),
        nom: this.credentials.get('nom')?.value,
        cognom: this.credentials.get('cognom')?.value,
        email: this.credentials.get('email')?.value,
        tokenPush: '',
        avatar: { storageBase64: '', storagePath: '' }
      }

      await this.userService.addUser(myUser);

      await loading.dismiss();

			this.router.navigateByUrl('/', { replaceUrl: true });
		} else {
			this.showAlert('Registration failed', 'Please try again!');
		}
	}

	async showAlert(header: string, message: string) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}
}