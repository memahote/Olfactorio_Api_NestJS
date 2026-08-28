import { Inject, Injectable } from '@nestjs/common';
import { DATABASE } from './_utils/database.constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';


@Injectable()
export class DatabaseService {
  constructor(
    @Inject(DATABASE)
    public readonly db: NodePgDatabase,
  ) {}
}
