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
@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss', '../../app.component.scss'],
  imports: [NgIf, NgStyle, PrioritiesComponent, NgFor, MatCardModule, MatExpansionModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, HttpClientModule, ReactiveFormsModule, CategoryColorPickersComponent, CategoryComponent]
})
export class AddTaskComponent {
  subtasks: string[] = []
  assignedTo = []
  users: {}[] = []
  task = new JoinTask()
  panelOpenState = false;


  constructor(private http: HttpClient, public us: UsersService, public ts: TaskService) {
    this.us.getUsers();
    this.ts.loadTasks()
    console.log(this.ts.allTasks);

  }



  addTaskForm = new FormGroup({
    title: new FormControl('', Validators.required,),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    subtasks: new FormControl(''),
  })


  addTask() {
    if (this.addTaskForm) {
      this.task.title = this.addTaskForm.get('title')?.value as string;
      this.task.description = this.addTaskForm.get('description')?.value as string;
      this.task.due_date = this.addTaskForm.get('date')?.value as string;
      this.task.subtasks = this.subtasks
      console.log(JSON.stringify(this.task));
      this.ts.addTask(JSON.stringify(this.task))
    }
  }


  addSubtask() {
    let subtask = this.addTaskForm.get('subtasks')?.value
    if (subtask)
      this.subtasks.push(subtask);
    this.addTaskForm.get('subtasks')?.setValue('');
  }


 

  addPriority(priority: any) {
    this.task.priority = priority
    console.log(this.task.priority);
  }


  addUser(user: JoinUser) {
    this.task.assigned_users.push(user.username)
    console.log(this.task.assigned_users);
  }
}
