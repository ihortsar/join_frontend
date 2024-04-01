import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PrioritiesComponent } from '../priorities/priorities.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UsersService } from '../../services/users.service';
import { UserFormService } from '../../services/user-form.service';
@Component({
  selector: 'app-assign-users',
  standalone: true,
  imports: [NgIf, NgStyle, PrioritiesComponent, NgFor, MatCheckboxModule, MatCardModule, MatExpansionModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './assign-users.component.html',
  styleUrl: './assign-users.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AssignUsersComponent implements OnInit {
  usersCheckedForm: FormGroup;

  panelOpen = false;
  @Input() task: any = {}

  constructor(public us: UsersService, public userForm: UserFormService, public formBuilder: FormBuilder,
  ) {
    this.usersCheckedForm = this.formBuilder.group({});
  }


  async ngOnInit() {
    await this.us.getUsers();
    this.userForm.initializeUsersForm(this.usersCheckedForm)
    this.userForm.task = this.task
  }
}
