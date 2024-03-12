import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from '../../services/task.service';
import {
  MatDialog
} from '@angular/material/dialog';
import { EditTaskComponent } from '../../edit-task/edit-task.component';


@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [NgFor, TaskCardComponent, MatFormFieldModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatSelectModule,],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent implements OnInit {
  constructor(public ts: TaskService, public dialog: MatDialog) { }
  ngOnInit() {
    this.ts.loadTasks()
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,task: any): void {
    console.log("Task before opening dialog: ",task);
    this.dialog.open(EditTaskComponent, {
      data: { task: task },
      width: '450px',
      height: '80%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}


