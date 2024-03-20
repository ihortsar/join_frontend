import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PrioritiesComponent } from '../priorities/priorities.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UsersService } from '../../services/users.service';
import { JoinUser } from '../../../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-assign-users',
  standalone: true,
  imports: [NgIf, NgStyle, PrioritiesComponent, NgFor, MatCheckboxModule, MatCardModule, MatExpansionModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './assign-users.component.html',
  styleUrl: './assign-users.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AssignUsersComponent implements OnInit {

  panelOpenState = false;
  @Input() task: any = {}
  usersCheckedForm: FormGroup;

  constructor(public us: UsersService, private formBuilder: FormBuilder) {
    this.usersCheckedForm = this.formBuilder.group({});

  }

  async ngOnInit() {
    await this.us.getUsers();
    this.initializeUsersForm()
  }


  addUser(user: any, i: number) {
    const control = this.usersCheckedForm?.get(`checked${i}`);
    if (control) {
      user.checked = control.value;
      if (user.checked) {
        this.task.assigned_users.push(user)
        console.log(user);
      } else {
        const index = this.task.assigned_users.findIndex((u: any) => u.id=== user.id);
        console.log(user);
        if (index !== -1) {
          this.task.assigned_users.splice(index, 1);
        }
      }
      console.log(this.task.assigned_users);
    }
  }



  initializeUsersForm() {
    this.us.allUsers.forEach((user: any, i: number) => {
      user.checked = false
      this.usersCheckedForm.addControl(`checked${i}`, this.formBuilder.control(user.checked));
    });
  }
}
