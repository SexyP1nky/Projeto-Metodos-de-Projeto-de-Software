import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { FacadeService } from '../../services/playlist-user-facade.service';
import { SnackService } from '../../services/snackbar/snack.service';
import { Subject } from 'rxjs';
import { User } from '../../models/user';

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

  user$!: Subject<User[]>;

  constructor(private playlistUserFacade: FacadeService, private snackService: SnackService) {
    this.user$= new Subject<User[]>;
  }

  async register() {
    await this.playlistUserFacade.addUser(this.login, '12345689', this.password)

    this.openSnackBar('User registered!')
    this.login = '';
    this.password = '';
  }

  openSnackBar(message: string) {
    this.snackService.openSnackBar(message)
  }
}
