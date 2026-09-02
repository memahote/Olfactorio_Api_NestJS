import { atmospheres } from 'src/atmospheres/atmospheres.schema';

export type AtmosphereInsert = typeof atmospheres.$inferInsert;

export type AtmosphereSelect = typeof atmospheres.$inferSelect;
