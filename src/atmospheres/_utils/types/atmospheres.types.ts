import { atmospheres } from 'src/atmospheres/atmospheres.schema';
import { FileSelect } from 'src/files/_utils/types/files.types';

export type AtmosphereInsert = typeof atmospheres.$inferInsert;

export type AtmosphereSelect = typeof atmospheres.$inferSelect;

export type AtmosphereWithFile = Omit<AtmosphereSelect, 'fileId'> & {
  file: FileSelect;
};
