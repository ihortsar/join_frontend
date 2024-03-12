import { Component, Inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  task: any = {};

  constructor(public dialogRef: MatDialogRef<EditTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public ts: TaskService) {
    this.task = this.data.task;
    this.editTaskForm = new FormGroup({
      title: new FormControl(this.task ? this.task.title : ''),
      description: new FormControl(this.task ? this.task.description : ''),
    });
  }

  editTaskForm: FormGroup;


  async saveEditedTask() {
    const titleControl = this.editTaskForm.get('title')!;
    const descriptionControl = this.editTaskForm.get('description')!;
    this.task.title = titleControl.value;
    this.task.description = descriptionControl.value;
    await this.ts.editTask(this.task.id, this.task);
  }


}
