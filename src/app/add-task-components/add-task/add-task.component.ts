import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { UsersService } from '../../services/users.service';
import { MatCardModule } from '@angular/material/card';
import { CategoryColorPickersComponent } from '../category-color-pickers/category-color-pickers.component';
import { JoinTask } from '../../../models/task.model';
import { PrioritiesComponent } from '../priorities/priorities.component';
import { CategoryComponent } from "../category/category.component";
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssignUsersComponent } from '../assign-users/assign-users.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-task',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss', '../../app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [NgIf, NgStyle, AssignUsersComponent, PrioritiesComponent, NgFor, MatDatepickerModule, MatCheckboxModule, MatCardModule, MatExpansionModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, HttpClientModule, ReactiveFormsModule, CategoryColorPickersComponent, CategoryComponent]
})
export class AddTaskComponent {
  subtasks: { text: string, checked: boolean }[] = []
  assignedTo = []
  users: {}[] = []
  task = new JoinTask()

  constructor(private router: Router, public us: UsersService, public ts: TaskService) {
    this.ts.loadTasks()
  }

  addTaskForm = new FormGroup({
    title: new FormControl('', Validators.required,),
    description: new FormControl('', [Validators.required]),
    date: new FormControl(new Date().toISOString(), [Validators.required]),
    subtasks: new FormControl(''),
  })


  /**
   * Adds a new task to the system.
   * Validates form inputs for title, description, and due date.
   * Upon successful addition, navigates to the task board page.
   */
  async addTask() {
    if (this.addTaskForm) {
      this.task.title = this.addTaskForm.get('title')?.value as string;
      this.task.description = this.addTaskForm.get('description')?.value as string;
      this.task.due_date
      let date = this.addTaskForm.get('date')?.value as string;
      const datePipe = new DatePipe('en-US');
      this.task.due_date = datePipe.transform(date, 'yyyy-MM-dd')?.toString();
      this.task.subtasks = this.subtasks;
      this.task.state = 'toDo'
      await this.ts.addTask(this.task)
      this.router.navigateByUrl('/task_board');
    }
  }


  /**
   * Adds a new subtask to the current task.
   * Retrieves subtask text from the form control and adds it to the list of subtasks.
   */
  addSubtask() {
    let subtask = {
      text: this.addTaskForm.get('subtasks')?.value ?? '',
      checked: false
    };
    if (subtask.text !== '') {
      this.subtasks.push(subtask);
      this.addTaskForm.get('subtasks')?.setValue('');
    }
  }


  /**
   * Deletes a subtask from the list of subtasks.
   * @param i Index of the subtask to be deleted
   */
  deleteSubtask(i: number) {
    this.subtasks.splice(i, 1)
  }


  /**
   * Sets the priority of the task.
   * @param priority The priority level to be assigned to the task
   */
  addPriority(priority: any) {
    this.task.priority = priority
  }

}
