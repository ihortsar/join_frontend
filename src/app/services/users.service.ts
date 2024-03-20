import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JoinUser } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  username = ''
  password = ''
  constructor(private http: HttpClient, private router: Router) { }


  allUsers: JoinUser[] = [];

  async getUsers() {
    const url = environment.baseUrl + '/all_users/'
    const response = await lastValueFrom(this.http.get<JoinUser[]>(url));
    this.allUsers = response
  }

  loggedUser = { username: '' };
  async login() {
    try {
      let resp: any = await this.loginWithUsernameAndPassword(this.username, this.password);
      localStorage.setItem('token', resp['token']);
      this.router.navigateByUrl('/task_board');
      this.loggedUser.username = this.username
      localStorage.setItem('loggedUser', this.loggedUser.username)
    } catch (e) {
      alert('Login fehlgeschlagen!');
    }
  }

  loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/'
    const body = {
      username: username,
      password: password,
    };

    return lastValueFrom(this.http.post(url, body));
  }
}
