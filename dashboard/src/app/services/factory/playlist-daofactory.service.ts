import { Injectable } from '@angular/core';
import { Database, MongoDBDatabase, SqlDatabase } from '../../models/database';

@Injectable({
  providedIn: 'root',
})
export class PlaylistDAOFactoryService {
  constructor() {}

  create(type: string): Database {
    if (type === 'sql') return new SqlDatabase();
    if (type === 'mongodb') return new MongoDBDatabase();

    console.log('Unsuported type, returning mongo');
    return new MongoDBDatabase();
  }
}
