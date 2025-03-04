import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-screen',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss',
})
export class LoginScreenComponent {
  login: string = '';
  password: string = '';
  error: boolean = true;
  duration: number = 5000;

  private _snackBar = inject(MatSnackBar);

  constructor(private userService: UserService) {

  }

  async register() {
    this.login = '';
    this.password = '';
    await this.userService.addUser(this.login, '12345689', this.password)

    this.openSnackBar('User registered!')
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', {
      duration: this.duration,
    });
  }
}
