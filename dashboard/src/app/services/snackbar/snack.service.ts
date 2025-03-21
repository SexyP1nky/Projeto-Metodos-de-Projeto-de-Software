import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  private _snackBar = inject(MatSnackBar);

  duration: number = 5000;
  constructor() {}

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', {
      duration: this.duration,
    });
  }
}
