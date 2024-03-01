import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../../environments/environment';
import { log } from 'console';
import { METHODS } from 'http';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = ''
  password = ''

  constructor(private router: Router) { }
  async login() {
    let url = environment.baseUrl + '/login/';
    let response: any = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.username,
        password: this.password
      })
    });
    const returned = await response.json()
    localStorage.setItem('token', returned['token'])
    this.router.navigateByUrl('/task_board');
  }


  loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/'
    const body = {
      username: username,
      password: password,
    };

    return { url, body }
  }


}
