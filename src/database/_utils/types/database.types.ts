import { TransactionalAdapterDrizzleOrm } from '@nestjs-cls/transactional-adapter-drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';


export type MyDrizzleAdapter = TransactionalAdapterDrizzleOrm<NodePgDatabase>;