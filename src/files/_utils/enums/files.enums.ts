export const FilesDirectoryEnum = {
  NOTE: 'note',
  AMBIANCE: 'ambiance',
} as const satisfies Record<string, string>;

export const FilesDirectoryPrivacyEnum = {
  PRIVATE: 'private',
  PUBLIC: 'public',
} as const satisfies Record<string, string>;
