import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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

  register() {
    console.log(this.login, this.password);
    if (this.error) {
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this._snackBar.open('Display error message', 'Dismiss', {
      duration: this.duration,
    });
  }
}
