import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(public us: UsersService) { }


}






