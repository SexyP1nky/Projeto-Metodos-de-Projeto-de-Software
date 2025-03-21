import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Playlist } from '../models/playlist';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  user: User = new User('samuel', '123', '123', new Date(), false);
  constructor() {}

  createNewPlaylist(title: string) {
    const playlist = new Playlist(title, this.user.id);
    playlist.tracks.push(new Track('New jeans', 300000, 'youtube'));
    this.user.playlists.set(title, playlist);
  }

  deletePlaylist(title: string): boolean {
    return this.user.playlists.delete(title);
  }

  renamePlaylist(playlist: Playlist, newName: string) {
    playlist.title = newName;
  }
}
