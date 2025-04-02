import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Playlist } from '../models/playlist';
import { Track } from '../models/track';
import { RepositoryService } from './repository/repository.service';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  public user: User = new User('samuel', '123', '123', new Date(), false);
  
  constructor(private repository: RepositoryService) {}

  createNewPlaylist(title: string): void {
      const playlist = new Playlist(title, this.user.id);
      playlist.tracks.push(new Track('New Jeans', 300000, 'youtube'));

      this.user.playlists.set(title, playlist);

      this.repository.create(playlist);
  }

  deletePlaylist(title: string): boolean {
      // DB não está implementado
      this.user.playlists.delete(title);
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

