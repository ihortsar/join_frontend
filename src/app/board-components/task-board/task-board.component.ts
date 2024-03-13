import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from '../../services/task.service';
import { MatDialog, } from '@angular/material/dialog';
import { EditTaskComponent } from '../../edit-task/edit-task.component';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  DragDropModule,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { JoinTask } from '../../../models/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [NgIf, DragDropModule, CdkDropListGroup, CdkDropList, CdkDrag, NgFor, TaskCardComponent, MatFormFieldModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatSelectModule,],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent implements AfterViewInit {

  constructor(public ts: TaskService, public dialog: MatDialog) {
    this.ts.allTasksSubject.subscribe(data => {
      if (data) {
        this.ts.allTasks = data
        this.filterTasks()
      }
    })
  }
  async ngAfterViewInit() {
    await this.ts.loadTasks();
    await this.ts.loadCategories();
    this.filterTasks();

  }
  task: any = {}
  toDo: JoinTask[] = []
  inProgress: JoinTask[] = []
  awaiting: JoinTask[] = []
  done: JoinTask[] = []

  async drop(event: any, state: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const droppedTask = event.container.data[event.currentIndex]
      droppedTask.state = state
      await this.ts.editTask(droppedTask.id, droppedTask)
    }
    await this.ts.loadTasks();
    this.filterTasks();
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, task: any): void {
    this.dialog.open(EditTaskComponent, {
      data: { task: task },
      width: '450px',
      height: '80%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  filterTasks() {
    this.toDo = this.ts.allTasks.filter(task => task.state === 'toDo')
    this.inProgress = this.ts.allTasks.filter(task => task.state === 'inProgress')
    this.awaiting = this.ts.allTasks.filter(task => task.state === 'awaiting')
    this.done = this.ts.allTasks.filter(task => task.state === 'done')
  }
}


