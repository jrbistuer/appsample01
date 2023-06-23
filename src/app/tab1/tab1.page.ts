import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  logout() {
    console.log('logging out');
    this.auth.logout().then(() => {
      this.router.navigate(['login']);
    });
  }

}
