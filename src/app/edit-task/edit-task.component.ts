import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { TaskService } from '../services/task.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Subtask } from '../../models/task.model';
import { PrioritiesComponent } from "../add-task-components/priorities/priorities.component";


@Component({
    selector: 'app-edit-task',
    standalone: true,
    templateUrl: './edit-task.component.html',
    styleUrl: './edit-task.component.scss',
    imports: [PrioritiesComponent,MatRadioModule, MatCheckboxModule, NgFor, NgIf, ReactiveFormsModule, DatePipe, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, PrioritiesComponent]
})
export class EditTaskComponent implements OnInit {

  editTaskForm: FormGroup;
  task: any = {};
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  subtaskCheckedForm = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EditTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public ts: TaskService) {
    this.task = this.data.task;
    this.editTaskForm = new FormGroup({
      title: new FormControl(this.task ? this.task.title : ''),
      description: new FormControl(this.task ? this.task.description : ''),
    });
  }


  ngOnInit(): void {
    this.initializeSubtasksForm()
    this.ts.task=this.task
  }


  initializeSubtasksForm() {
    this.task.subtasks.forEach((subtask: Subtask, i: number) => {
      this.subtaskCheckedForm.addControl(`checked${i}`, this.formBuilder.control(subtask.checked));
    });
  }


  async checkSubtask(subtask: Subtask, i: number) {
    const control = this.subtaskCheckedForm?.get(`checked${i}`);
    if (control) {
      subtask.checked = control.value;
      if (subtask.checked) {
        this.ts.completedSubtasks++
      } else {
        this.ts.completedSubtasks--
      }
    }
    this.ts.countCompletedSubtasks()
  }


  async saveEditedTask() {
    const titleControl = this.editTaskForm.get('title')!;
    const descriptionControl = this.editTaskForm.get('description')!;
    this.task.title = titleControl.value;
    this.task.description = descriptionControl.value;
    await this.ts.editTask(this.task.id, this.task);
  }


}
