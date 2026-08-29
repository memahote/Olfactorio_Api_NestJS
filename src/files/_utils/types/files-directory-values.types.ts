import { FilesDirectoryEnum } from "../enums/files.enums";

export type FilesDirectoryValues =
  (typeof FilesDirectoryEnum)[keyof typeof FilesDirectoryEnum];