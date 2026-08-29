import { FilesDirectoryPrivacyEnum } from "../enums/files.enums";

export type FilesDirectoryPrivacyValues =
  (typeof FilesDirectoryPrivacyEnum)[keyof typeof FilesDirectoryPrivacyEnum];