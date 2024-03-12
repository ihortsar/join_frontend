import { Routes } from '@angular/router';
import { LoginComponent } from './auth-components/login/login.component';
import { TaskBoardComponent } from './board-components/task-board/task-board.component';
import { AddTaskComponent } from './add-task-components/add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { SignupComponent } from './auth-components/signup/signup.component';
import { AuthGuard } from './auth.guard';




export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'task_board', component: TaskBoardComponent, canActivate: [AuthGuard] },
    { path: 'newtask', component: AddTaskComponent },
    { path: 'edit', component: EditTaskComponent },
    { path: 'signup', component: SignupComponent },
];
