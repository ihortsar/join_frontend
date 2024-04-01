import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JoinUser } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  username = ''
  password = ''
  loggedUser: any
  allUsers: any = [];
  usersInitials = { fn: '', ln: '' }
  constructor(private http: HttpClient, private router: Router) { }

  /**
  * Retrieves all users from the backend.
  * If successful, updates the `allUsers` property.
  */
  async getUsers() {
    try {
      const url = environment.baseUrl + '/all_users/'
      const response = await lastValueFrom(this.http.get<JoinUser[]>(url));
      this.allUsers = response
    } catch (er) {
      console.log('Something went wrong:', er);
    }
  }


  /**
 * Logs in the user with the provided credentials.
 * If successful, stores the token in local storage,
 * navigates to the summary page, and sets the logged-in user.
 */
  async login() {
    try {
      let resp: any = await this.loginWithUsernameAndPassword(this.username, this.password);
      localStorage.setItem('token', resp['token']);
      await this.getLoggedUser(resp)
      this.router.navigateByUrl('/summary');
      localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser))
    } catch (e) {
      alert('Login fehlgeschlagen!');
    }
  }


  /**
  * Logs in the user with the provided username and password.
  * @param username The username of the user
  * @param password The password of the user
  * @returns Promise containing the login response
  */
  loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/'
    const body = {
      username: username,
      password: password,
    };
    return lastValueFrom(this.http.post(url, body));
  }


  /**
   * Retrieves the logged-in user based on the login response.
   * @param resp The login response
   */
  async getLoggedUser(resp: any) {
    await this.getUsers()
    this.loggedUser = this.allUsers.find((user: any) => user.id === resp.user_id)
  }


  /**
   * Returns the logged-in user from local storage.
   * @returns The logged-in user
   */
  returnLoggedUser() {
    const loggedUserString = localStorage.getItem('loggedUser');
    const loggedUser = loggedUserString ? JSON.parse(loggedUserString) : null;
    return loggedUser
  }

}
