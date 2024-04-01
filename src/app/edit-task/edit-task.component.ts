import { Component, Inject, OnInit } from '@angular/core';
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
import { AssignUsersComponent } from "../add-task-components/assign-users/assign-users.component";
import { UserFormService } from '../services/user-form.service';
import { UsersService } from '../services/users.service';
import { UserInfoComponent } from "../user-info/user-info.component";


@Component({
  selector: 'app-edit-task',
  standalone: true,
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
  imports: [UserInfoComponent, PrioritiesComponent, MatRadioModule, MatCheckboxModule, NgFor, NgIf, ReactiveFormsModule, DatePipe, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, PrioritiesComponent, AssignUsersComponent, UserInfoComponent]
})
export class EditTaskComponent implements OnInit {

  editTaskForm: FormGroup;
  task: any = {};
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  subtaskCheckedForm = this.formBuilder.group({});
  users: any = []
  usersCheckedForm: FormGroup;

  constructor(
    public us: UsersService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ts: TaskService,
    public userForm: UserFormService,
  ) {
    this.task = this.data.task;
    this.editTaskForm = new FormGroup({
      title: new FormControl(this.task ? this.task.title : ''),
      description: new FormControl(this.task ? this.task.description : ''),
    });
    this.usersCheckedForm = this.formBuilder.group({});
    this.initializeSubtasksForm()
  }


  /**
   * Initializes the user form with task details.
   * Called when the component is initialized.
   */
  async ngOnInit() {
    this.ts.task = this.task
    this.userForm.task = this.task
    this.userForm.initializeUsersForm(this.usersCheckedForm)
  }


  /**
 * Initializes the form controls for subtasks.
 * Adds form controls for each subtask in the task.
 */
  initializeSubtasksForm() {
    this.task.subtasks.forEach((subtask: Subtask, i: number) => {
      this.subtaskCheckedForm.addControl(`checkedSubtasks${i}`, this.formBuilder.control(subtask.checked));
    });
  }


  /**
 * Handles the checking/unchecking of a subtask.
 * Updates the subtask's checked status and counts completed subtasks.
 * @param subtask The subtask to be checked/unchecked
 * @param i The index of the subtask in the list
 */
  async checkSubtask(subtask: Subtask, i: number) {
    const control = this.subtaskCheckedForm?.get(`checkedSubtasks${i}`);
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


  /**
 * Saves the edited task by updating its title and description.
 * Called when the user clicks the save button.
 */
  async saveEditedTask() {
    const titleControl = this.editTaskForm.get('title')!;
    const descriptionControl = this.editTaskForm.get('description')!;
    this.task.title = titleControl.value;
    this.task.description = descriptionControl.value;
    await this.ts.editTask(this.task.id, this.task);
  }


  /**
 * Sets the priority of the task.
 * @param priority The priority level to be assigned to the task
 */
  addPriority(priority: any) {
    this.task.priority = priority
  }


}
