import { Playlist } from './playlist';
import { Track } from './track';

export interface DatabaseAdapter {
  create(playlist: Playlist): void;
  update(playlist: Playlist): void;
  delete(playlist: Playlist): void;
  findByID(id: string): Playlist;
}

export class SqlDatabaseAdapter implements DatabaseAdapter {
  private database: SqlDatabase = new SqlDatabase();

  create(playlist: Playlist): void {
    this.database.create(playlist);
  }

  update(playlist: Playlist): void {
    this.database.update(playlist);
  }

  delete(playlist: Playlist): void {
    this.database.delete(playlist);
  }

  findByID(id: string): Playlist {
    return this.database.findByID(id);
  }
}

export class MongoDBDatabaseAdapter implements DatabaseAdapter {
  private database: MongoDBDatabase = new MongoDBDatabase();

  create(playlist: Playlist): void {
    this.database.create(playlist);
  }

  update(playlist: Playlist): void {
    this.database.update(playlist);
  }

  delete(playlist: Playlist): void {
    this.database.delete(playlist);
  }

  findByID(id: string): Playlist {
    return this.database.findByID(id);
  }
}

export class SqlDatabase {
  create(playlist: Playlist): void {
    console.log('Created in Sql Database');
  }

  update(playlist: Playlist): void {
    console.log('Updated in Sql Database');
  }

  delete(playlist: Playlist): void {
    console.log('Deleted in Sql Database');
  }

  findByID(id: string): Playlist {
    console.log('Found playlist in Sql Database');
    return new Playlist('New Jeans Playlist', 'user123');
  }
}

export class MongoDBDatabase {
  create(playlist: Playlist): void {
    console.log('Created in MongoDB Database');
  }

  update(playlist: Playlist): void {
    console.log('Updated in MongoDB Database');
  }

  delete(playlist: Playlist): void {
    console.log('Deleted in MongoDB Database');
  }

  findByID(id: string): Playlist {
    console.log('Found playlist in MongoDB Database');
    const playlist = new Playlist('New Jeans Playlist', 'user123');
    const track = new Track('New Jeans', 180, 'spotify:track:12345');
    playlist.addTrack(track);
    return playlist;
  }
}
