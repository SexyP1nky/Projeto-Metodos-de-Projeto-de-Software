export class Track {
  title!: string;
  duration!: number;
  URI!: string;

  constructor(title: string, duration: number, URI: string) {
    this.title = title;
    this.duration = duration;
    this.URI = URI;
  }
}
