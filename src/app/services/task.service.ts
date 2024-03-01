import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService{

  constructor() { }

  allTasks = []
  showFiller = false;

  async loadTasks() {
    let fetched = await this.authorizeAndFetch()
    let json = await fetched.json()
    this.allTasks = json
    console.log(json);

  }

  async authorizeAndFetch() {
    let url = environment.baseUrl + '/tasks/'
    let response = await fetch(url,
      {
        method: 'GET',
        headers: new Headers({
          'Authorization': `token ${localStorage.getItem('token')}`
        })
      }
    )
    return response

  }
}
