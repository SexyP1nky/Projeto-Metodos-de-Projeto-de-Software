import { Playlist } from './playlist';
import { Track } from './track';
import { TrackDecorator } from './trackDecorator';

export class PlaylistDecorator {
  constructor(protected playlist: Playlist) {}

  addTrack(trackTitle: string, duration: number, URI: string,): PlaylistDecorator {
    let track = new Track(trackTitle, 300000, URI);

    track = new TrackDecorator(track)
      .normalizeURI()
      .formatDuration()
      .shortenTitle(15)
      .getTrack();

    this.playlist.tracks.push(track);
    return this;
  }

  getPlaylist(): Playlist {
    return this.playlist;
  }
}
