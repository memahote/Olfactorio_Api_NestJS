import { files } from 'src/files/files.schema';

export type FileInsert = typeof files.$inferInsert;

export type FileSelect = typeof files.$inferSelect;
