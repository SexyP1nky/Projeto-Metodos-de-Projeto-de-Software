import { Injectable } from '@angular/core';
import { Database } from '../../models/database';
import { PlaylistDAOFactoryService } from '../factory/playlist-daofactory.service';
import { Playlist } from '../../models/playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistDAOService {
  private db!: Database;

  constructor(private playlistFactory: PlaylistDAOFactoryService) {
    this.db = this.playlistFactory.create('mongodb');
  }

  updateDatabaseType(type: 'mongodb' | 'sql'): void {
    this.db = this.playlistFactory.create(type)
  }

  create(playlist: Playlist): void {
    this.db.create(playlist);
  }

  update(playlist: Playlist): void {
    this.db.update(playlist);
  }

  delete(playlist: Playlist): void {
    this.db.delete(playlist);
  }

  findByID(id: string): Playlist {
    return this.db.findByID(id);
  }
}
