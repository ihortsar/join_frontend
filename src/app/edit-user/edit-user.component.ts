import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { environment } from '../../../environments/environment';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [NgIf, MatButtonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  user
  delete = false
  sureDelete = false
  constructor(public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private ts: TaskService, private router: Router) {
    this.user = this.data.user
  }

  /**
   * Toggles the delete flag to confirm account deletion.
   */
  tryDeleteAccount() {
    this.delete = !this.delete
  }


  /**
 * Deletes the user account.
 * Sends a delete request to the backend server.
 * Removes the user's token from local storage upon successful deletion.
 */
  async deleteAccount() {
    try {
      const url = environment.baseUrl + '/all_users/' + `${this.user.id}/`;
      let response = await fetch(url,
        {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
          }),
        })
      if (response.ok) {
        localStorage.removeItem('token')
        this.router.navigateByUrl('/login')
      }
    } catch (er) {
      console.log(er);
    }
  }
}
