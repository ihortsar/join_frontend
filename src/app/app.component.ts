import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginComponent } from "./auth-components/login/login.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ NgIf, RouterModule, CommonModule, RouterOutlet, MatFormFieldModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatSelectModule, LoginComponent]
})
export class AppComponent {
  title = 'join_frontend';
  constructor(public router: Router) { }
  calculateRouter() {
    if (this.router.url === '/login' || this.router.url === '/') {
      return 'overflowHidden';
    } else {
      return null;
    }
  }


  async logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}