import { Track } from './track';

export class Playlist {
  title!: string;
  tracks!: Track[];
  creatorID: string;

  constructor(title: string, creatorID: string) {
    this.title = title;
    this.tracks = [];
    this.creatorID = creatorID;
  }

  addTrack(track: Track) {
    this.tracks.push(track);
  }
}
