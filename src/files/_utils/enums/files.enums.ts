export const FilesDirectoryEnum = {
  NOTE: 'note',
  AMBIANCE: 'ambiance',
  OLFACTIVE_FAMILIES: 'olfactive_families'
} as const satisfies Record<string, string>;

export const FilesDirectoryPrivacyEnum = {
  PRIVATE: 'private',
  PUBLIC: 'public',
} as const satisfies Record<string, string>;
