import { Injectable } from '@angular/core';
import { DatabaseAdapter, MongoDBDatabaseAdapter, SqlDatabaseAdapter } from '../../models/database';

@Injectable({
  providedIn: 'root',
})
export class PlaylistDAOFactoryService {
  constructor() {}

create(type: string): DatabaseAdapter {
    if (type === 'sql') return new SqlDatabaseAdapter();
    if (type === 'mongodb') return new MongoDBDatabaseAdapter();

    console.log('Unsupported type, returning MongoDB adapter by default.');
    return new MongoDBDatabaseAdapter();
  }
}
