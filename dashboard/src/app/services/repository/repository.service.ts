import { Injectable } from '@angular/core';
import { Playlist } from '../../models/playlist';
import { PlaylistDAOService } from '../dao/playlist-dao.service';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  constructor(private playlistDAO: PlaylistDAOService) {}

  create(playlist: Playlist): void {
    this.playlistDAO.create(playlist);
  }

  update(playlist: Playlist): void {
    this.playlistDAO.update(playlist);
  }

  delete(playlist: Playlist): void {
    this.playlistDAO.delete(playlist);
  }

  findByID(id: string): Playlist {
    return this.playlistDAO.findByID(id);
  }
}
