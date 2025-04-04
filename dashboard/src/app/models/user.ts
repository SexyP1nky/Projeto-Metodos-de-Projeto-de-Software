import { Track } from './track';
import { Playlist } from './playlist';

export class User {
  name!: string;
  id!: string;
  lastAccessTime!: Date;
  blocked!: boolean;
  password!: string;
  playlists!: Map<string, Playlist>;

  constructor(
    name: string,
    id: string,
    password: string,
    lastAccessTime: Date,
    blocked: boolean
  ) {
    this.name = name;
    this.id = id;
    this.password = password;
    this.lastAccessTime = lastAccessTime;
    this.blocked = blocked;
    this.playlists = new Map<string, Playlist>();
  }

  login(): boolean {
    return true;
  }

  logout(): void {
    return;
  }
}
