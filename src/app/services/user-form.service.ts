import { Injectable } from '@angular/core';
import { UsersService } from './users.service'; // Import UserService
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  task: any
  constructor(private us: UsersService, public formBuilder: FormBuilder) {
  }

  /**
 * Initializes the user form with checkboxes for each user.
 * @param form The form group to initialize
 */
  initializeUsersForm(form: any) {
    this.us.allUsers.forEach((user: any, i: number) => {
      if (this.task && this.task.assigned_users.length > 0) {
        let index = this.task.assigned_users.findIndex((assignedUser: any) => assignedUser/* .id  */=== user.id)
        if (index === -1) {
          user.checked = false
          form.addControl(`checked${i}`, this.formBuilder.control(user.checked));
        } else {
          user.checked = true
          form.addControl(`checked${i}`, this.formBuilder.control(user.checked));
        }
      } else {
        form.addControl(`checked${i}`, this.formBuilder.control(user.checked));
      }
    });
  }


  /**
 * Adds or deletes a user from the task's assigned users list based on checkbox status.
 * @param user The user to add or delete
 * @param i The index of the user
 * @param form The form group containing the checkboxes
 * @param control The control name of the checkbox
 */
  addDeleteUser(user: any, i: number, form: FormGroup, control: string) {
    const formControl = form?.get(control);
    if (formControl) {
      user.checked = formControl.value;
      console.log(user);
      
      if (user.checked) {
        this.task.assigned_users.push(user.id)
      } else {
        const index = this.task.assigned_users.findIndex((u: any) => u.id === user.id);
        this.task.assigned_users.splice(index, 1);
      }
    }
  }
}
