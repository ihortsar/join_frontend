import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JoinUser } from '../../../models/user.model';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersService } from '../../services/users.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgIf, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  allUsers: any = []
  usernameExists = false
  constructor(private router: Router, private http: HttpClient, public us: UsersService) { }

  /**
 * Initializes component properties and retrieves existing users.
 * Called when the component is initialized.
 */
  async ngOnInit() {
    try {
      await this.us.getUsers()
    } catch (er) {
      console.log(er);
    }
  }


  /**
 * FormGroup for user signup form.
 * Contains form controls for username, first name, last name, email and password.
 */
  signUpForm = new FormGroup(
    {
      username: new FormControl('', Validators.required,),
      firstName: new FormControl('', Validators.required,),
      lastName: new FormControl('', Validators.required,),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    }
  )


  /**
 * Creates a new user account.
 * Validates username uniqueness before signup.
 * Navigates to the login page upon successful signup.
 */
  createUser() {
    let user = this.getUsersData()
    if (!this.checkUsername()) {
      try {
        this.signUp(user)
        this.router.navigateByUrl('/login');
      } catch (er) {
        alert('Signup fehlgeschlagen');
      }
    }
  }


  /**
 * Retrieves user data from the signup form.
 * @returns User data entered in the signup form
 */
  getUsersData() {
    let user = new JoinUser(
      {
        username: this.signUpForm.get('username')?.value as string,
        firstName: this.signUpForm.get('firstName')?.value as string,
        lastName: this.signUpForm.get('lastName')?.value as string,
        useremail: this.signUpForm.get('email')?.value as string,
        userpassword: this.signUpForm.get('password')?.value as string,
      }
    )
    return user
  }


  /**
 * Sends a signup request to the backend server.
 * @param user The user object containing signup data
 * @returns A promise representing the signup request
 */
  signUp(user: JoinUser) {
    const url = environment.baseUrl + '/signup/'
    return lastValueFrom(this.http.post(url, user));
  }


  /**
 * Checks if the entered username already exists among existing users.
 * Sets usernameExists flag accordingly.
 * @returns Boolean indicating whether the username exists or not
 */
  checkUsername() {
    let username = this.signUpForm.get('username')?.value
    this.usernameExists = this.us.allUsers.find((user: any) =>
      user.username == username)
    return this.usernameExists
  }
}