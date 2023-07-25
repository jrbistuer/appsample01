import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	credentials!: FormGroup;
	recoverForm!: FormGroup;
	isModalOpen = false;

	constructor(
		private fb: FormBuilder,
		private loadingController: LoadingController,
		private utilsService: UtilsService,
		private authService: AuthService,
		private userService: UserService,
		private router: Router,
		private auth: Auth
	) {}

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

	ngOnInit() {
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
		this.recoverForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]]
		});
	}

	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.login(this.credentials.value);
		await loading.dismiss();

		if (user) {
			this.userService.getUser().then((myUser) => {
				console.log('myUser', myUser);
				this.router.navigateByUrl('/', { replaceUrl: true });
				});
		} else {
			this.utilsService.showAlert('Login failed', 'Please try again!');
		}
	}

	setOpen(isOpen: boolean) {
		this.isModalOpen = isOpen;
	}

	recoverPwd() {
		if(this.recoverForm.valid) {
			sendPasswordResetEmail(this.auth, this.recoverForm.controls['email'].value).then((res) => {
				console.log(res);
				const endFunction = () => {
					this.isModalOpen = false;
					return false;
				};
				this.utilsService.showAlert('', 'Missatge enviat!', endFunction);	
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				this.utilsService.showAlert(errorCode, errorMessage);				
			});
		}
	}

}