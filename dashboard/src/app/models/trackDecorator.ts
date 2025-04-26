import { Track } from "./track";

export class TrackDecorator {
    constructor(protected track: Track) {}
  
    shortenTitle(maxLength: number): TrackDecorator {
      if (this.track.title.length > maxLength) {
        this.track.title = this.track.title.slice(0, maxLength) + '...';
      }
      return this;
    }
  
    formatDuration(): TrackDecorator {
      this.track.duration = Math.round(this.track.duration / 60000);
      return this;
    }
  
    normalizeURI(): TrackDecorator {
      if (!this.track.URI.startsWith('https://')) {
        this.track.URI = 'https://' + this.track.URI;
      }
      return this;
    }

    getTrack(): Track {
      return this.track;
    }
  }
  