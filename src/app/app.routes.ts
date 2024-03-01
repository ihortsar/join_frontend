import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'task_board', component: TaskBoardComponent },
    { path: 'newtask', component: AddTaskComponent },
    { path: 'edit', component: EditTaskComponent },
];
