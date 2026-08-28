import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DatabaseService } from './database.service';
import { DATABASE } from './_utils/database.constants';

@Module({
  providers: [
    {
      provide: DATABASE,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const pool = new Pool({
          connectionString: config.getOrThrow<string>('DATABASE_URL'),
        });

        return drizzle({
          client: pool
        });
      },
    },
    DatabaseService
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
