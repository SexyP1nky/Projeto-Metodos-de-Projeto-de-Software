import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Playlist } from '../models/playlist';
import { Track } from '../models/track';
import { RepositoryService } from './repository/repository.service';
import { ReportService } from './report/report.service';
import { Observable, Subject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  
  user!: User;
  users!: User[];

  usersSub!: Subscription

  user$!: Subject<User[]>;

  constructor(private repository: RepositoryService, private reportService: ReportService) {
    this.user$ = new Subject<User[]>();

    this.usersSub = this.user$.subscribe((users) => {
      if (users) {
        this.user = users[0]
        this.users = users;
      }
    })

    const user = new User('samuel', '123', '123', new Date(), false);

    this.updateUser$([user])
  }

  getUser$(): Subject<User[]> {
    return this.user$;
  }

  updateUser$(users: User[]) {
    this.user$.next(users)
  }

  createNewPlaylist(title: string): void {
      const playlist = new Playlist(title, this.user.id);
      playlist.tracks.push(new Track('New Jeans', 300000, 'youtube'));

      this.user.playlists.set(title, playlist);

      this.repository.create(playlist);

      this.reportService.generatePDFReport(this.users)
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

