import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { JoinTask } from '../../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }



  allTasks: JoinTask[] = [];
  allCategories: JoinTask["category"][] = []
  showFiller = false;
  token = localStorage.getItem('token')
  allTasksSubject = new BehaviorSubject<JoinTask[]>([]);
  toDo: JoinTask[] = []
  inProgress: JoinTask[] = []
  awaiting: JoinTask[] = []
  done: JoinTask[] = []
  completedSubtasks = 0
  task: any
  async loadTasks() {
    try {
      let fetched = await this.authorizeAndFetch('/tasks/');
      let json = await fetched.json();
      this.allTasks = json;
      this.allTasksSubject.next(this.allTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }


  async loadCategories() {
    try {
      let fetched = await this.authorizeAndFetch('/categories/');
      let json = await fetched.json();
      this.allCategories = json;
      return this.allCategories
    } catch (error) {
      console.error('Error loading categories:', error);
      return null
    }
  }


  async authorizeAndFetch(element: string) {
    try {
      let url = environment.baseUrl + element;
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
    this.allTasksSubject.next(this.allTasks)
    return response
  }


  async deleteTask(id: number) {
    try {
      let url = environment.baseUrl + '/tasks/' + `${id}/`;
      let response = await fetch(url,
        {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `token ${this.token}`
          }),
        })
      const taskIndex = this.allTasks.findIndex(task => task.id === id);
      this.allTasks.splice(taskIndex, 1)
      this.allTasksSubject.next(this.allTasks)
    } catch (er) {
      console.log(er);

    }
  }


  async addTask(body: any) {
    const category = body.category
    let categoryResponse = await this.addCategory(JSON.stringify(category))
    let categoryJson = await categoryResponse.json()
    body.category = categoryJson.pk
    const task = JSON.stringify(body)
    let url = environment.baseUrl + '/tasks/';
    let response = await fetch(url,
      {
        method: 'POST',
        headers: new Headers({
          'Authorization': `token ${this.token}`,
          'Content-Type': 'application/json',
        }),
        body: task
      })
    this.allTasksSubject.next(this.allTasks)

  }


  async addCategory(body: string) {
    let url = environment.baseUrl + '/categories/';
    let response = await fetch(url,
      {
        method: 'POST',
        headers: new Headers({
          'Authorization': `token ${this.token}`,
          'Content-Type': 'application/json',
        }),
        body: body
      })
    return response;

  }


  filterTasks() {
    this.toDo = this.allTasks.filter(task => task.state === 'toDo')
    this.inProgress = this.allTasks.filter(task => task.state === 'inProgress')
    this.awaiting = this.allTasks.filter(task => task.state === 'awaiting')
    this.done = this.allTasks.filter(task => task.state === 'done')
  }


  countCompletedSubtasks() {
    this.completedSubtasks = 0;
    this.task.subtasks.forEach((subtask: any) => {
      if (subtask.checked) {
        this.completedSubtasks++;
        this.task.completed = (this.completedSubtasks / this.task.subtasks.length) * 100
      } else {
        this.task.completed = (this.completedSubtasks / this.task.subtasks.length) * 100
      }
    })
  }
}
