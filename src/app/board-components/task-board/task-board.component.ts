import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  DragDropModule,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { UsersService } from '../../services/users.service';
import { UserFormService } from '../../services/user-form.service';


@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [NgIf, DragDropModule, CdkDropListGroup, CdkDropList, CdkDrag, NgFor, TaskCardComponent, MatFormFieldModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatSelectModule,],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent implements OnInit {

  task: any = {}
  constructor(public ts: TaskService, public dialog: MatDialog, public us: UsersService, private userForm: UserFormService) { }

  /**
   * Initializes component properties and loads tasks, users, and categories.
   * Subscribes to task service for updates on tasks.
   * Called when the component is initialized.
   */
  async ngOnInit() {
    await this.ts.loadTasks();
    await this.us.getUsers();
    this.ts.allTasksSubject.subscribe(data => {
      if (data) {
        this.ts.allTasks = data
        this.ts.filterTasks()
      }
    })
    await this.ts.loadCategories();
    this.ts.filterTasks();
  }


  /**
 * Handles dropping a task onto a different state.
 * Updates task state and saves changes.
 * @param event The drop event
 * @param state The target state for the dropped task
 */
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

      const droppedTask = event.item.data
      droppedTask.state = state
      await this.ts.editTask(droppedTask.id, droppedTask)
    }
    await this.ts.loadTasks();
    this.ts.filterTasks();
  }


  /**
 * Opens the edit task dialog.
 * @param enterAnimationDuration Duration of the enter animation
 * @param exitAnimationDuration Duration of the exit animation
 * @param task The task to be edited
 */
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, task: any): void {
    this.dialog.open(EditTaskComponent, {
      data: { task: task },
      width: '450px',
      height: '80%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}


