import { DatePipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../services/task.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subtask } from '../../../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [NgIf, DatePipe, MatCardModule, MatProgressBarModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent implements OnInit {

  @Input() task: any
  constructor(public ts: TaskService) { }
  ngOnInit(): void {
    this.ts.task=this.task
    this.displayCategory();
    this.ts.countCompletedSubtasks()
  }




  displayCategory() {
    let category = this.ts.allCategories.find(c => c.id === this.task.category);
    if (category) {
      return { name: category.name, color: category.color };
    } else {
      return { name: 'Category Not Found' };
    }
  }





}
