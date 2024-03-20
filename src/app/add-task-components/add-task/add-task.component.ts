import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { UsersService } from '../../services/users.service';
import { MatCardModule } from '@angular/material/card';
import { CategoryColorPickersComponent } from '../category-color-pickers/category-color-pickers.component';
import { JoinTask } from '../../../models/task.model';
import { PrioritiesComponent } from '../priorities/priorities.component';
import { JoinUser } from '../../../models/user.model';
import { CategoryComponent } from "../category/category.component";
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssignUsersComponent } from '../assign-users/assign-users.component';
@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss', '../../app.component.scss'],
  imports: [NgIf, NgStyle, AssignUsersComponent, PrioritiesComponent, NgFor, MatCheckboxModule, MatCardModule, MatExpansionModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, HttpClientModule, ReactiveFormsModule, CategoryColorPickersComponent, CategoryComponent]
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
    date: new FormControl('', [Validators.required]),
    subtasks: new FormControl(''),
  })


  async addTask() {
    if (this.addTaskForm) {
      this.task.title = this.addTaskForm.get('title')?.value as string;
      this.task.description = this.addTaskForm.get('description')?.value as string;
      this.task.due_date = this.addTaskForm.get('date')?.value as string;
      this.task.subtasks = this.subtasks;
      this.task.state = 'toDo'
      await this.ts.addTask(this.task)
      this.router.navigateByUrl('/task_board');
    }
  }


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


  deleteSubtask(i: number) {
    this.subtasks.splice(i, 1)
  }


  addPriority(priority: any) {
    this.task.priority = priority
  }



}
