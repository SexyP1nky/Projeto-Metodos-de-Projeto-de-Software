import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Playlist } from '../models/playlist';
import { Track } from '../models/track';
import { RepositoryService } from './repository/repository.service';
import { ReportService } from './report/report.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { PlaylistDecorator } from '../models/playlistDecorator';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {

  constructor(private repository: RepositoryService) {



    // const user = new User('samuel', '123', '123', new Date(), false);

    // this.updateUser$([user]);
  }

  // getUser$(): Subject<User[]> {
  //   return this.user$;
  // }

  // updateUser$(users: User[]) {
  //   this.user$.next(users);
  // }

  createNewPlaylist(title: string, user: User): void {
    console.log('users in crating playlist', user);

    let playlist = new Playlist(title, user.id);

    if (user.playlists) {
      console.log('user playlists', user.playlists);
      user.playlists = new Map<string, Playlist>(user.playlists);
    }

    playlist = new PlaylistDecorator(playlist)
      .addTrack(
        `NewJeans (뉴진스) 'Right Now' Official MV`,
        300000,
        'https://youtu.be/m6pTbEz4w3o'
      )
      .getPlaylist();

    user.playlists.set(title, playlist);
    this.repository.create(playlist);
  }

  deletePlaylist(title: string, user: User): boolean {
    user.playlists.delete(title);
    const playlist = this.repository.findByID(title);
    if (playlist) {
      this.repository.delete(playlist);
      return true;
    }
    return false;
  }

  renamePlaylist(playlist: Playlist, newName: string): void {
    playlist.title = newName;
    this.repository.update(playlist);
  }
}
