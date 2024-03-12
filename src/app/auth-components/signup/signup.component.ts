import { Component } from '@angular/core';
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


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private router: Router, private http: HttpClient) { }



  signUpForm = new FormGroup(
    {
      username: new FormControl('', Validators.required,),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    }
  )


  createUser() {
    let user = new JoinUser(
      {
        username: this.signUpForm.get('username')?.value as string,
        useremail: this.signUpForm.get('email')?.value as string,
        userpassword: this.signUpForm.get('password')?.value as string,
      }
    )
    try {
      this.signUp(user)
      this.router.navigateByUrl('/login');
    } catch (er) {
      alert('Signup fehlgeschlagen');
    }
  }


  signUp(user: JoinUser) {
    const url = environment.baseUrl + '/signup/'
    return lastValueFrom(this.http.post(url, user));
  }




}