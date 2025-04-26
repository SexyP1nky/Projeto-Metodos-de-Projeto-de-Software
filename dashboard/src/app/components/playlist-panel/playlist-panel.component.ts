import { Component, inject, model, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { FacadeService } from '../../services/playlist-user-facade.service';
import { Playlist } from '../../models/playlist';
import { SnackService } from '../../services/snackbar/snack.service';
import { Subject, Subscription } from 'rxjs';
import { User } from '../../models/user';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-playlist-panel',
  imports: [
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatListModule,
    MatExpansionModule,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './playlist-panel.component.html',
  styleUrl: './playlist-panel.component.scss',
})
export class PlaylistPanelComponent {
  title: string = '';
  duration: number = 5000;

  private readonly dialog = inject(MatDialog);
  readonly title_ = signal('');
  readonly name = model('');
  user$: Subject<User[]> = new Subject<User[]>();
  usersSub!: Subscription;
  user!: User;
  users!: User[];


  constructor(private playlistUserFacade: FacadeService, private snackService: SnackService) {

  }

  ngOnInit() {
    
    this.usersSub = this.playlistUserFacade.getUser$().subscribe((users) => {
      console.log(users)
      this.users = users
      this.user = users[0]

    })
  }

  get playlists() {
    return this.playlistUserFacade.getUserPlaylists();
  }

  async register() {
    this.playlistUserFacade.createNewPlaylist(this.title, this.user);
    console.log(this.user)
    this.snackService.openSnackBar(`Playlist '${this.title}' created.`)
    this.title = '';
  }

  deletePlaylist(title: string) {
    this.playlistUserFacade.deletePlaylist(title, this.user)
    this.snackService.openSnackBar(`Playlist '${title}' deleted.`)
  }


  openDialog(playlist: Playlist): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name: this.name(), title: playlist.title, playlist: playlist},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return
      const temp: string = playlist.title;
      const newName: string = result()
      console.log(newName)
      this.playlistUserFacade.renamePlaylist(playlist, newName)
      
      this.snackService.openSnackBar(`Playlist '${temp}' renamed to '${newName}'.`)
    }); 
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-playlist.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<Playlist>(MAT_DIALOG_DATA);
  readonly playlistTitle = model(this.data.title);
  isDialogFocused = true;
  constructor(private playlistUserFacade: FacadeService) {
    window.addEventListener('blur', () => this.isDialogFocused = false);
    window.addEventListener('focus', () => {this.isDialogFocused = true; console.log(this.data)});
  }
  onNoClick(): void {
    console.log(this.data)
    this.dialogRef.close();
    // this.playlistUserFacade.renamePlaylist((this.data as any).playlist, this.data.title)
  }
}