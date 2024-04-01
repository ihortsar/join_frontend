import { DatePipe, NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../services/task.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subtask } from '../../../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [NgStyle, NgIf, DatePipe, MatCardModule, MatProgressBarModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent implements OnInit {

  @Input() task: any
  constructor(public ts: TaskService) { }

  /**
 * Initializes the component with task details.
 * Sets task data and displays category.
 * Called when the component is initialized.
 */
  ngOnInit(): void {
    this.ts.task = this.task
    this.displayCategory();
    this.ts.countCompletedSubtasks()
  }


/**
 * Displays the category of the task.
 * Retrieves category details based on the task's category ID.
 * @returns Object containing category name and color
 */
  displayCategory() {
    let category = this.ts.allCategories.find(c => c.id === this.task.category);
    if (category) {
      return { name: category.name, color: category.color };
    } else {
      return { name: 'Category Not Found' };
    }
  }

}
