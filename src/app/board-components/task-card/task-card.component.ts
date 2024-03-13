import { DatePipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [NgIf, DatePipe, MatCardModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent implements OnInit {
  constructor(public ts: TaskService) { }
  ngOnInit(): void {
    this.displayCategory()
  }
  @Input() task: any



  displayCategory() {
    let category = this.ts.allCategories.find(c => c.id === this.task.category);
    if (category) {
      return { name: category.name, color: category.color };
    } else {
      return { name: 'Category Not Found' };
    }
  }


}
