import { NotePyramidLevelEnum } from '../enums/note-pyramid-level.enum';

export type NotePyramidLevelType =
  (typeof NotePyramidLevelEnum)[keyof typeof NotePyramidLevelEnum];
