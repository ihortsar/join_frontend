import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JoinUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,) { }


  allUsers: JoinUser[] = [];

  async getUsers() {
    const url = environment.baseUrl + '/all_users/'
    const response = await lastValueFrom(this.http.get<JoinUser[]>(url)); 
    this.allUsers = response
  }
}
