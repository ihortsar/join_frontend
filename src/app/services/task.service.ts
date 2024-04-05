import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { JoinTask } from '../../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  allTasks: JoinTask[] = [];
  allCategories: JoinTask["category"][] = []
  showFiller = false;
  allTasksSubject = new BehaviorSubject<JoinTask[]>([]);
  toDo: JoinTask[] = []
  inProgress: JoinTask[] = []
  awaiting: JoinTask[] = []
  done: JoinTask[] = []
  completedSubtasks = 0
  task: any


  async loadTasks() {
    try {
      /* let fetched = await this.authorizeAndFetch('/tasks/', 'GET', undefined);
      let json = await fetched.json();
      this.allTasks = json; */
      let loggedUserString = localStorage.getItem('loggedUser');
      if (loggedUserString !== null) {
        let loggedUser = JSON.parse(loggedUserString);
        if (loggedUser && loggedUser.tasks) {
          this.allTasks = loggedUser.tasks;
          this.allTasksSubject.next(this.allTasks);
        }
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }


  async loadCategories() {
    try {
      let fetched = await this.authorizeAndFetch('/categories/', 'GET', undefined);
      let json = await fetched.json();
      this.allCategories = json;
      return this.allCategories
    } catch (error) {
      console.error('Error loading categories:', error);
      return null
    }
  }


  async authorizeAndFetch(element: string, method: string, body: any) {
    try {
      let url = environment.baseUrl + element;
      let response = await fetch(url,
        {
          method: method,
          headers: new Headers({
            'Authorization': `token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          }),
          body: body ? JSON.stringify(body) : undefined
        })
      return response;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }


  async editTask(id: number, task: {}) {
    let url = '/tasks/' + `${id}/`;
    let response = await this.authorizeAndFetch(url, 'PUT', task);
    this.editTaskInLocal(id, task)
    this.allTasksSubject.next(this.allTasks)
    return response
  }


  async deleteTask(id: number) {
    try {
      let url = '/tasks/' + `${id}/`;
      await this.authorizeAndFetch(url, 'DELETE', undefined);
      const taskIndex = this.allTasks.findIndex(task => task.id === id);
      this.allTasks.splice(taskIndex, 1)
      this.deleteTaskInLocal(taskIndex)
      this.allTasksSubject.next(this.allTasks)
    } catch (er) {
      console.log(er);
    }
  }


  async addTask(body: any) {
    const category = body.category
    let categoryResponse = await this.addCategory(category)
    let categoryJson = await categoryResponse.json()
    body.category = categoryJson.pk
    let url = '/tasks/';
    let response = await this.authorizeAndFetch(url, 'POST', body);
    let savedTask = await response.json()
    this.addTaskInLocal(savedTask)
    this.allTasksSubject.next(this.allTasks)
    console.log(this.allTasks);
  }


  async addCategory(body: string) {
    let response = await this.authorizeAndFetch('/categories/', 'POST', body);
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


  addTaskInLocal(task: {}) {
    let userString = localStorage.getItem('loggedUser')
    if (userString !== null) {
      let loggedUser = JSON.parse(userString)
      loggedUser.tasks.push(task)
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    }
  }


  deleteTaskInLocal(i: number) {
    let userString = localStorage.getItem('loggedUser')
    if (userString !== null) {
      let loggedUser = JSON.parse(userString)
      loggedUser.tasks.splice(i, 1)
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }
  }


  editTaskInLocal(id: number, task: {}) {
    let userString = localStorage.getItem('loggedUser')
    if (userString !== null) {
      let loggedUser = JSON.parse(userString)
      const taskIndex = this.allTasks.findIndex(task => task.id === id);
      loggedUser.tasks[taskIndex] = task
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }
  }
}