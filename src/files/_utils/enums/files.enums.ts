export const FilesDirectoryEnum = {
  NOTES: 'notes',
  AMBIANCES: 'ambiances',
  OLFACTIVE_FAMILIES: 'olfactive_families',
  ATMOSPHERES: 'atmospheres'
} as const satisfies Record<string, string>;

export const FilesDirectoryPrivacyEnum = {
  PRIVATE: 'private',
  PUBLIC: 'public',
} as const satisfies Record<string, string>;
