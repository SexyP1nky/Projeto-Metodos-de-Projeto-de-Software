import { Injectable } from '@angular/core';
import { Playlist } from '../models/playlist';
import { User } from '../models/user';
import { Track } from '../models/track';
import { UserService } from './user.service';
import { PlaylistService } from './playlist.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  constructor(
    private playlistService: PlaylistService,
    private userService: UserService
  ) {}

  generateReport(): void {
    const user = this.playlistService.user
    console.log(`User ${user.name} has ${user.playlists.size} playlists.`);

    user.playlists.forEach((playlist: Playlist) => {
      console.log(`\nPlaylist: ${playlist.title}`);
      if (playlist.tracks.length > 0) {
        console.log('Tracks:');
        playlist.tracks.forEach((track: Track) => {
          console.log(`- ${track.title} (${track.duration} ms) [${track.URI}]`);
        });
      } else {
        console.log('No tracks in this playlist.');
      }
    });
  }

  async createNewPlaylist(title: string): Promise<void> {
    this.playlistService.createNewPlaylist(title);
  }

  async deletePlaylist(title: string): Promise<boolean> {
    return this.playlistService.deletePlaylist(title);
  }

  renamePlaylist(playlist: Playlist, newName: string) {
    this.playlistService.renamePlaylist(playlist, newName);
  }

  getUserPlaylists(): Playlist[] {
    const user = this.playlistService.user;
    if (!user || !user.playlists) {
      return [];
    }
    return Array.from(user.playlists.values());
  }

  async addUser(name: string, id: string, password: string): Promise<User> {
    return this.userService.addUser(name, id, password);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.userService.getUserById(id);
  }

  async updateUser(user: User): Promise<void> {
    return this.userService.updateUser(user);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  async authenticateUser(id: string, password: string): Promise<User> {
    return this.userService.authenticateUser(id, password);
  }

  async blockUser(id: string): Promise<void> {
    return this.userService.blockUser(id);
  }

  async unblockUser(id: string): Promise<void> {
    return this.userService.unblockUser(id);
  }
}
