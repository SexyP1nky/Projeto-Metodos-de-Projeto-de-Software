import { forwardRef, Inject, Injectable } from '@angular/core';
import { Playlist } from '../models/playlist';
import { User } from '../models/user';
import { Track } from '../models/track';
import { UserService } from './user.service';
import { PlaylistService } from './playlist.service';
import { distinctUntilChanged, Observable, Subject } from 'rxjs';
import { ReportService } from './report/report.service';
import { UserStateService } from '../user-state.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  user!: User;
  constructor(
    private userStateService: UserStateService,
    private reportService: ReportService, 
    private playlistService: PlaylistService,
    private userService: UserService

  ) {
    this.userService.getUser$().pipe(
      distinctUntilChanged((prev, curr) => prev.length === curr.length && prev.every((user, index) => user.id === curr[index].id))
    ).subscribe((users) => {
      this.userStateService.updateUsers$(users);
      this.user = users[0];
    });
  }

  generateReport(): void {
    this.reportService.generatePDFReport();
  }

  getUser$(): Observable<User[]> {
    console.log('getUser$');
    return this.userService.getUser$();
  }

  updateUser$(users: User[]) {
    this.userService.updateUser$(users);
  }

  async createNewPlaylist(title: string, user: User): Promise<void> {
    this.playlistService.createNewPlaylist(title, user);
  }

  async deletePlaylist(title: string, user: User): Promise<boolean> {
    return this.playlistService.deletePlaylist(title, user);
  }

  renamePlaylist(playlist: Playlist, newName: string) {
    this.playlistService.renamePlaylist(playlist, newName);
  }

  getUserPlaylists(): Playlist[] {
    if (!this.user?.playlists) {
      return [];
    }
    return Array.from(this.user.playlists.values());
  }

  async addUser(name: string, id: string, password: string): Promise<User> {
    console.log('User added in FacadeService');
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
