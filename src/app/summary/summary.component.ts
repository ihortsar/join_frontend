import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../services/task.service';
import { NgFor, NgIf } from '@angular/common';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [NgIf, NgFor, MatCardModule, MatButtonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
  constructor(public ts: TaskService, public us: UsersService) { }

  tasks: { title: string, tasks: any[] }[] = [];
  options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  today: string | undefined;

  async ngOnInit() {
    this.today = new Date().toLocaleDateString('en-US', this.options);
    await this.ts.loadTasks()
    this.ts.filterTasks()
    this.tasks = [
      { title: 'To do', tasks: this.ts.toDo },
      { title: 'In Progress', tasks: this.ts.inProgress },
      { title: 'Awaiting Feedback', tasks: this.ts.awaiting },
      { title: 'Done', tasks: this.ts.done }]
  }

  getLoggedUser() {
    const loggedUser = localStorage.getItem('loggedUser')
    return loggedUser
  }



}
