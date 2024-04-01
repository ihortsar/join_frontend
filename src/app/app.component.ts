import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from "./auth-components/login/login.component";
import { UsersService } from './services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { TaskService } from './services/task.service';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NgIf, RouterModule, CommonModule, RouterOutlet, MatFormFieldModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatSelectModule, LoginComponent]
})
export class AppComponent {
  title = 'join_frontend';
  loggedUser: any

  constructor(public router: Router, public us: UsersService, public dialog: MatDialog, private http: HttpClient, private ts: TaskService) { }

  ngOnDestroy(): void {
    this.ts.allTasksSubject.unsubscribe()
  }
  /**
   * Calculates the CSS class for the router outlet based on the current route.
   * Returns 'overflowHidden' if the route is '/login' or '/', otherwise returns null.
   * @returns CSS class for the router outlet
   */
  calculateRouter() {
    if (this.router.url === '/login' || this.router.url === '/') {
      return 'overflowHidden';
    } else {
      return null;
    }
  }


  /**
 * Logs out the current user by removing the token from local storage and navigating to the login page.
 */
  async logout() {
    const url = environment.baseUrl + '/logout/'
    const headers = new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('token'));
    try {
      await lastValueFrom(this.http.post(url, {}, { headers }));
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');

    }
    catch (er) {
      console.log(er);
    }
  }


  /**
 * Opens the edit user dialog.
 * @param enterAnimationDuration Duration of the enter animation
 * @param exitAnimationDuration Duration of the exit animation
 */
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditUserComponent, {
      data: { user: this.us.returnLoggedUser() },
      maxWidth: '300px',
      position: { top: '70px', right: '0' },
      panelClass: 'no-overflow-y',
      enterAnimationDuration,
      exitAnimationDuration,
    });

  }
}