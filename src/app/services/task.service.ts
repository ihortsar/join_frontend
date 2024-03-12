import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { JoinTask } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  allTasks: JoinTask[] = [];
  showFiller = false;
  token = localStorage.getItem('token')


  async loadTasks() {
    try {
      let fetched = await this.authorizeAndFetch();
      let json = await fetched.json();
      this.allTasks = json;
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }

  async authorizeAndFetch() {
    try {
      let url = environment.baseUrl + '/tasks/';
      let response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `token ${this.token}`
        })
      });
      return response;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }



  async editTask(id: number, task: {}) {
    let url = environment.baseUrl + '/tasks/' + `${id}/`;
    let response = await fetch(url,
      {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `token ${this.token}`
        }),
        body: JSON.stringify(task)
      }
    )
    return response
  }


  async deleteTask(id: number) {
    let url = environment.baseUrl + '/tasks/' + `${id}/`;
    let response = await fetch(url,
      {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `token ${this.token}`
        }),
      })
  }


  async addTask(body: string) {
    let url = environment.baseUrl + '/tasks/';
    let response = await fetch(url,
      {
        method: 'POST',
        headers: new Headers({
          'Authorization': `token ${this.token}`,
          'Content-Type': 'application/json',
        }),
        body: body
      })
    console.log(response);

  }
}
