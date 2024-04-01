import { Routes } from '@angular/router';
import { LoginComponent } from './auth-components/login/login.component';
import { TaskBoardComponent } from './board-components/task-board/task-board.component';
import { AddTaskComponent } from './add-task-components/add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { SignupComponent } from './auth-components/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { SummaryComponent } from './summary/summary.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';




export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'task_board', component: TaskBoardComponent, canActivate: [AuthGuard] },
    { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
    { path: 'newtask', component: AddTaskComponent, canActivate: [AuthGuard] },
    { path: 'edit', component: EditTaskComponent, canActivate: [AuthGuard] },
    { path: 'legal_notice', component: LegalNoticeComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent },
];
