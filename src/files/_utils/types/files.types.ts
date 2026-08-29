import { FilesDirectoryEnum, FilesDirectoryPrivacyEnum } from "../enums/files.enums";

export type FilesDirectoryValues =
  (typeof FilesDirectoryEnum)[keyof typeof FilesDirectoryEnum];

export type FilesDirectoryPrivacyValues =
  (typeof FilesDirectoryPrivacyEnum)[keyof typeof FilesDirectoryPrivacyEnum];
